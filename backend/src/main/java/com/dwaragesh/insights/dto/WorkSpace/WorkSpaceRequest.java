package com.dwaragesh.insights.dto.WorkSpace;

import com.dwaragesh.insights.model.User;

public record WorkSpaceRequest(

        String workSpaceName,
        int userId

) {
}
