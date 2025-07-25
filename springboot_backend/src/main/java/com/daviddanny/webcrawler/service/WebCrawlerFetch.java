package com.daviddanny.webcrawler.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;


public class WebCrawlerFetch {
    public Set<String> crawlLinks(String startUrl) throws IOException {
        Set<String> links = new HashSet<>();

        Document doc = Jsoup.connect(startUrl).get();

        Elements aTags = doc.select("a[href]"); // All anchor tags with hrefs

        for (Element link : aTags) {
            String href = link.absUrl("href"); // Absolute URL
            if (!href.isEmpty()) {
                links.add(href);
            }
        }

        return links;}
}
