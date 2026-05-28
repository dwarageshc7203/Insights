package com.dwaragesh.insights.dto.WorkSpace;

import com.dwaragesh.insights.model.User;

public record WorkSpaceResponse(

        int wid,
        String wName,
        User owner

) {
}
