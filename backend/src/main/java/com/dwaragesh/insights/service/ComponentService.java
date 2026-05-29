package com.dwaragesh.insights.service;

import com.dwaragesh.insights.repository.ComponentRepository;
import com.dwaragesh.insights.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComponentService {

    @Autowired
    private ComponentRepository repository;

    @Autowired
    private UserRepository userRepo;



}
