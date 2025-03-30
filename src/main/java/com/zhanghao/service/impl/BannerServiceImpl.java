package com.zhanghao.service.impl;

import com.zhanghao.entity.Banner;
import com.zhanghao.repository.BannerRepository;
import com.zhanghao.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {
    
    @Autowired
    private BannerRepository bannerRepository;
    
    @Override
    public List<Banner> getAllActiveBanners() {
        return bannerRepository.findByEnabledTrueOrderBySortDesc();
    }
} 