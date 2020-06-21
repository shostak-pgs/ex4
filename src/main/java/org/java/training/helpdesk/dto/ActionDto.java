package org.java.training.helpdesk.dto;

import java.util.Map;
import java.util.Objects;

public class ActionDto {
    private String action;
    private Map<Long, Boolean> selected;

    public ActionDto(){}

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Map<Long, Boolean> getSelected() {
        return selected;
    }

    public void setSelected(Map<Long, Boolean> selected) {
        this.selected = selected;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ActionDto actionDto = (ActionDto) o;
        return Objects.equals(action, actionDto.action) &&
                Objects.equals(selected, actionDto.selected);
    }

    @Override
    public int hashCode() {
        return Objects.hash(action, selected);
    }

    @Override
    public String toString() {
        return "ActionDto{" +
                "action='" + action + '\'' +
                ", selected=" + selected +
                '}';
    }
}