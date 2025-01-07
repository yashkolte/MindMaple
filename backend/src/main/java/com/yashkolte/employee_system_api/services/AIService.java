package com.yashkolte.employee_system_api.services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Base64;

@Service
public class AIService {

    private final WebClient webClient;

    public AIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api-inference.huggingface.co/models/stabilityai").build();
    }

    public String generateImage(String prompt) {
        String apiUrl = "/stable-diffusion-3.5-large";
        String apiKey = "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"; // Your Hugging Face API key

        byte[] imageBytes = this.webClient.post()
                .uri(apiUrl)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue("{\"inputs\": \"" + prompt + "\"}")
                .retrieve()
                .bodyToMono(byte[].class)
                .block();

        // Log the Base64 string
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
        System.out.println("Generated Base64 Image: " + base64Image);
        return base64Image;
    }
}
