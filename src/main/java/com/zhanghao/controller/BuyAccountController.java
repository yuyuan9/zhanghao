package com.zhanghao.controller;

import com.zhanghao.dto.ApiResponse;
import com.zhanghao.entity.Account;
import com.zhanghao.entity.Order;
import com.zhanghao.entity.User;
import com.zhanghao.repository.OrderRepository;
import com.zhanghao.service.AccountService;
import com.zhanghao.service.BuyAccountService;

import com.zhanghao.util.PaymentApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * 购买账号controller
 */
@Controller
@RequestMapping("/buy")
public class BuyAccountController {

    @Autowired
    private BuyAccountService buyAccountService;

    @Autowired
    private AccountService accountService;

    @Autowired
    OrderRepository orderRepository;

    /**
     * 创建订单
     *
     * @return 订单信息及跳转到支付页面
     */
    @PostMapping("/createOrder")
    public String createOrder(
            @RequestParam("accountId") Long accountId,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("totalPrice") BigDecimal totalPrice,
            HttpSession session,
            Model model) {

        // 检查账号是否存在
        Optional<Account> accountOpt = accountService.getAccountById(accountId);
        if (!accountOpt.isPresent()) {
            // 账号不存在，返回错误页面
            return "redirect:/error?message=账号不存在";
        }
        User user = (User) session.getAttribute("currentUser");
        if (user == null) {
            return "redirect:/error?message=账号不存在";
        }
        Account account = accountOpt.get();

        // 检查库存是否充足
        if (account.getStock() < quantity) {
            // 库存不足，返回错误页面
            return "redirect:/error?message=库存不足";
        }
        totalPrice = account.getPrice().multiply(new BigDecimal(quantity));

        // 创建订单
        Order order = buyAccountService.createOrder(accountId, quantity, totalPrice, session);

        // 生成钱包地址（实际应用中应该从配置或服务中获取）
        String walletAddress = "TFwLF8JRn6YbEquqMMX5jfXWGYxCwaP8ob";

        BigDecimal usdtAmount = totalPrice;

        // 设置支付页面所需的数据
        model.addAttribute("orderId", order.getId());
        model.addAttribute("quantity", quantity);
        model.addAttribute("amount", usdtAmount.setScale(2, BigDecimal.ROUND_HALF_UP));

        model.addAttribute("walletAddress", walletAddress);
        model.addAttribute("qrcodeurl", order.getQrcodeurl());
        model.addAttribute("tim", order.getTim());
        model.addAttribute("oid", order.getOid());
        model.addAttribute("contactInfo", "@duotena");

        // 跳转到支付确认页面
        return "redirect:/buy/getOrderInfo?orderId=?orderId=" + order.getId();


    }

    /**
     * 获取订单详细信息
     *
     * @param orderId
     * @param model
     * @return
     */
    @GetMapping("/getOrderInfo")
    public String getOrderInfo(@RequestParam("orderId") Long orderId, Model model) {
        Order order = orderRepository.findById(orderId).get();
        model.addAttribute("orderId", order.getId());
        model.addAttribute("quantity", order.getQuantity());
        model.addAttribute("amount", order.getValue().setScale(2, BigDecimal.ROUND_HALF_UP));
        model.addAttribute("walletAddress", order.getName());
        model.addAttribute("qrcodeurl", order.getQrcodeurl());
        model.addAttribute("tim", order.getTim());
        model.addAttribute("oid", order.getOid());
        model.addAttribute("contactInfo", "@duotena");
        // 跳转到支付确认页面
        return "/pages/payment-confirm";
    }

    /**
     * 检查支付状态
     */
    @PostMapping("/checkPayment")
    @ResponseBody
    public Map<String, Object> checkPayment(@RequestParam("oid") String oid) {
        Map<String, Object> result = new HashMap<>();

        // 这里应该调用服务来检查支付状态
        if (PaymentApiClient.tronusdtCheck(oid)) {
            result.put("success", true);
        } else {
            result.put("success", false);
        }
        return result;
    }
}
