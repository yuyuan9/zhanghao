package com.zhanghao.util;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.zhanghao.dto.PaymentRequest;
import com.zhanghao.entity.Order;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class PaymentApiClient {
    private final static String baseUrl = "https://tronusdt.xyz/";

    /**
     * 点击订单支付状态
     * true: 已支付
     * false: 未支付
     *
     * @return
     */
    public static Boolean tronusdtCheck(String oid) {
        try {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url("https://tronusdt.xyz/?way=paycheck&oid=" + oid)
                    .get()
                    .addHeader("Accept", "*/*")
                    .addHeader("Accept-Encoding", "gzip, deflate, br")
                    .addHeader("User-Agent", "PostmanRuntime-ApipostRuntime/1.1.0")
                    .addHeader("Connection", "keep-alive")
                    .build();

            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                String resultBody = response.body() != null ? response.body().string() : null;
                if (ObjectUtil.isNotEmpty(resultBody)) {
                    //支付成功
                    if (1 == Integer.valueOf(JSONUtil.parse(resultBody).getByPath("status").toString())) {
                        return true;
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;

    }

    /**
     * 创建订单
     *
     * @param paymentRequest
     * @return
     */
    public static Order tronusdtPay(PaymentRequest paymentRequest) {
        String url = buildUrlWithParams(paymentRequest);
        try {
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(url)
                    .post(RequestBody.create(null, new byte[0]))
                    .addHeader("Accept", "*/*")
                    .addHeader("User-Agent", "PostmanRuntime-ApipostRuntime/1.1.0")
                    .addHeader("Connection", "keep-alive")
                    .build();

            Response response = client.newCall(request).execute();
            String resultStr = response.body().string();
            Order order = JSONUtil.toBean(resultStr, Order.class);
            return order;
        } catch (IOException e) {
            System.err.println("请求发生异常: " + e.getMessage());
        }
        return null;
    }

    /**
     * 将参数拼接到URL
     */
    private static String buildUrlWithParams(PaymentRequest request) {
        return baseUrl + "?way=" + encode(request.getWay()) +
                "&name=" + encode(request.getName()) +
                "&type=" + encode(request.getType()) +
                "&product=" + encode(request.getProduct()) +
                "&value=" + request.getValue() +
                "&jump=" + encode(request.getJump());
    }

    /**
     * URL编码
     */
    private static String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
