package com.wyplayer.model;

public class Music {
    private String name;
    private String singer;
    private String path;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSinger() {
        return singer;
    }

    public void setSinger(String singer) {
        this.singer = singer;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Music{" +
                "name='" + name + '\'' +
                ", singer='" + singer + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
