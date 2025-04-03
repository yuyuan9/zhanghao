package com.zhanghao.util;

import cn.hutool.core.util.ObjectUtil;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class HttpUtils {

    private static final OkHttpClient client = new OkHttpClient();

    /**
     * 执行POST请求（无请求体）
     *
     * @param url     请求URL
     * @param headers 请求头Map
     * @return 响应字符串
     * @throws IOException 如果请求失败
     */
    public static String doPostWithoutBody(String url, Map<String, String> headers) throws IOException {
        Request.Builder requestBuilder = new Request.Builder()
                .url(url)
                .post(RequestBody.create(null, new byte[0])); // Empty request body


        // 添加请求头
        if (headers != null) {
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                requestBuilder.addHeader(entry.getKey(), entry.getValue());
            }
        }

        Request request = requestBuilder.build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("请求失败，状态码: " + response.code());
            }
            byte[] responseBytes = response.body().bytes();
            String responseString = new String(responseBytes, StandardCharsets.UTF_8);
            if (ObjectUtil.isNotEmpty(responseString)) {
                return responseString;
            }
        }
        return null;
    }


    /**
     * 示例使用方法
     */
    public static void main(String[] args) {
        String url = "https://tronusdt.xyz/?way=pay&name=TFwLF8JRn6YbEquqMMX5jfXWGYxCwaP8ob&type=ustd&product=pay_acounts&value=1.2&jump=127.0.0.1%253A8088";

        Map<String, String> headers = Map.of(
                "Accept", "*/*",
                "Accept-Encoding", "gzip, deflate, br",
                "User-Agent", "PostmanRuntime-ApipostRuntime/1.1.0",
                "Connection", "keep-alive"
        );

        try {
            String response = doPostWithoutBody(url, headers);

            System.out.println("响应内容: " + response);
        } catch (IOException e) {
            System.err.println("请求发生异常: " + e.getMessage());
        }
    }
}