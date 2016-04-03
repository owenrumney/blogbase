---
layout: page
title: Site Search
---

<form action="get" id="site_search">
  <label for="search_box">What are you looking for?</label><input type="text" id="search_box">
  <input type="submit" value="Go" id="search_submit">
</form>

<ul id="search_results"></ul>

<script src="{{ site.baseurl }}public/js/lunr.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="{{ site.baseurl }}public/js/search.js"></script>
