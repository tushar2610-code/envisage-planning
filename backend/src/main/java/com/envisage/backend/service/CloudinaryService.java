package com.envisage.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public Map<String, Object> generateSignature(Map<String, Object> paramsToSign) {
        try {
            long timestamp = System.currentTimeMillis() / 1000L;
            Map<String, Object> params = new HashMap<>();
            params.put("timestamp", timestamp);
            
            if (paramsToSign != null) {
                params.putAll(paramsToSign);
            }
            
            String signature = cloudinary.apiSignRequest(params, cloudinary.config.apiSecret);
            
            Map<String, Object> result = new HashMap<>();
            result.put("timestamp", timestamp);
            result.put("signature", signature);
            result.put("api_key", cloudinary.config.apiKey);
            result.put("cloud_name", cloudinary.config.cloudName);
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Error generating Cloudinary signature", e);
        }
    }

    public String uploadMedia(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "auto" // Automatically handles both image and video
            ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Error uploading media to Cloudinary", e);
        }
    }
}
