package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.Canvas.CanvasRequest;
import com.dwaragesh.insights.dto.Canvas.CanvasResponse;
import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.User;
import com.dwaragesh.insights.repository.CanvasRepository;
import com.dwaragesh.insights.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanvasService {

    @Autowired
    private CanvasRepository repository;

    @Autowired
    private UserRepository userRepo;

    public CanvasResponse createCanvas(int uid, CanvasRequest request) {
        User user = userRepo.findById(uid)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Canvas canvas = new Canvas();
        canvas.setUid(uid);
        canvas.setCName(request.cName());

        Canvas savedCanvas = repository.save(canvas);

        return new CanvasResponse(
                savedCanvas.getCid(),
                savedCanvas.getCName(),
                savedCanvas.getUid(),
                savedCanvas.getCreatedAt()
        );
    }

    public CanvasResponse getCanvas(int cid) {
        Canvas canvas = repository.findById(cid)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        return new CanvasResponse(
                canvas.getCid(),
                canvas.getCName(),
                canvas.getUid(),
                canvas.getCreatedAt()
        );
    }

    public List<CanvasResponse> getAllCanvas(int uid) {
        List<Canvas> canvasList = repository.findByUser_UserId(uid);
        return canvasList.stream()
                .map(canvas -> new CanvasResponse(
                        canvas.getCid(),
                        canvas.getCName(),
                        canvas.getUid(),
                        canvas.getCreatedAt()
                ))
                .toList();
    }


}
