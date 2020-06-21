package org.java.training.helpdesk.entity.enums;

import java.util.Optional;

public enum State {
    BLOCKED("BLOCK"),
    UNBLOCKED("UNBLOCK");

    private String action;

    State(String action) {
        this.action = action;
    }

    public static Optional<State> fromAction(String action) {
        Optional<State> newState = Optional.empty();
        for (State state : values()) {
            if (state.getAction().equals(action)) {
                newState = Optional.of(state);
            }
        }
        return newState;
    }

    public String getAction() {
        return action;
    }
}