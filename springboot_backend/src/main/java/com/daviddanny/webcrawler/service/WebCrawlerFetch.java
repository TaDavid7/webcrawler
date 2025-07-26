package com.daviddanny.webcrawler.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.HashMap;

@Service
public class WebCrawlerFetch {
    public HashMap<String, String> crawlLinks(String startUrl) throws IOException {
        HashMap<String, String> links = new HashMap<>();

        Document doc = Jsoup.connect(startUrl).get();
        String something = doc.title();
        Elements aTags = doc.select("a[href]"); // All anchor tags with hrefs

        for (Element link : aTags) {
            String href = link.absUrl("href"); // Absolute URL
            if (!href.isEmpty()) {
                try {
                    Document sussyBaka = Jsoup.connect(href)
                            .userAgent("Mozilla/5.0")
                            .timeout(10000)
                            .get();
                    String title = sussyBaka.title();
                    System.out.println(title);
                    links.put(href, title);
                }
                catch (IOException e) {
                    System.out.println("skibidi");
                }
            }
        }
        return links;
    }
}
