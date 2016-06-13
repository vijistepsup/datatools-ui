package com.conveyal.datatools.editor.models.transit;

import com.conveyal.datatools.editor.models.Model;

import java.io.Serializable;
import java.net.URL;
import java.util.Date;

/**
 * Created by demory on 6/8/16.
 */
public class EditorFeed extends Model implements Cloneable, Serializable {

    // GTFS Editor defaults
    public String color;
    public Double defaultLat;
    public Double defaultLon;
    public String routeTypeId;

    // feed-info.txt fields
    public String feedPublisherName;
    public URL feedPublisherUrl;
    public String feedLang;
    public String feedVersion;
    public Date feedStartDate;
    public Date feedEndDate;

    // the associated FeedSource in the data manager DB
    public String feedSourceId;

    public EditorFeed clone () throws CloneNotSupportedException {
        return (EditorFeed) super.clone();
    }

}
