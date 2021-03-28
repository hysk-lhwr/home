package com.hysk.home.model;

import java.util.HashMap;
import java.util.Map;

public enum Category {
    // categories are predefined, not allowed to expand at will
    // when a filter is applied to a category, the filter retrieves an object with that category
    // in contrast to keywords, which can be expanded at will
    // when a filter is applied to a keyword, the filter performs search for the keyword in object's searchable text
    TECH("Technology", 1, "Technology"),
    LIFE("Life", 2, "Life"),
    UNCAT("Uncategorized", 3, "No specific category");

    private static final Map<String, Category> BY_LABEL = new HashMap<>();
    private static final Map<Integer, Category> BY_CAT_ID = new HashMap<>();
    private static final Map<String, Category> BY_CAT_DESCRIPTION = new HashMap<>();
    
    static {
        for (Category e : values()) {
            BY_LABEL.put(e.label, e);
            BY_CAT_ID.put(e.categoryId, e);
            BY_CAT_DESCRIPTION.put(e.description, e);
        }
    }

    public final String label;
    public final int categoryId;
    public final String description;

    private Category(String label, int catId, String catDesc) {
        this.label = label;
        this.categoryId = catId;
        this.description = catDesc;
    }

    public static Category valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }

    public static Category valueOfcategoryId(int catId) {
        return BY_CAT_ID.get(catId);
    }

    public static Category valueOfdescription(String desc) {
        return BY_CAT_DESCRIPTION.get(desc);
    }}
