// -*- js-indent-level: 2 -*-
(function (document) {
  'use strict';
  // More info about config & dependencies:
  // - https://github.com/hakimel/reveal.js#configuration
  // - https://github.com/hakimel/reveal.js#dependencies
  Reveal.initialize({
    transition : "fade",
    history : true,
    slideNumber: 'c/t',
    controls: false,
    showNotes: false,
    dependencies: [
      { src: 'reveal.js/plugin/markdown/marked.js' },
      { src: 'reveal.js/plugin/markdown/markdown.js' },
      { src: 'reveal.js/plugin/notes/notes.js', async: true },
      { src: 'reveal.js/plugin/highlight/highlight.js',
        async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
      { src: 'reveal.js/plugin/math/math.js', async: true }
    ]
  });

  // Handle svg-slide
  Reveal.addEventListener("svg-slide", function(event) {
    Reveal.addEventListener("fragmentshown", function(e) {
      var object_id = 'mathdiagWP';
      var object = document.getElementById(object_id)
      var objectDoc = object.getSVGDocument();
      var bgimg = objectDoc.getElementById('image10');
      bgimg.style['opacity'] = 0.2;

      var projGroup = objectDoc.getElementById('g2992');
      projGroup.style['display'] = 'block';
    }, false);
  }, false);

  // Handle footnotes and citations
  Reveal.addEventListener( 'slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    var footerele = document.getElementById("footer");
    footerele.innerHTML = "";
    var footnotelist = event.currentSlide.getElementsByTagName("cite");
    Array.from(footnotelist).forEach(function(fnl) {
      footerele.innerHTML += "<div>" + fnl.innerHTML + "</div>";
    });
  } );

  // Pause and play videos on slide change
  Reveal.addEventListener( 'slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    if (event.previousSlide) {
      var pvideles = event.previousSlide.getElementsByTagName("video");
      Array.from(pvideles).forEach(function (pvidele) {
        pvidele.pause();
      });
    }
    
    var videles = event.currentSlide.getElementsByTagName("video");
    Array.from(videles).forEach(function (videle) {
      videle.pause();
      videle.currentTime = 0;
      videle.play();
    });
  });

  (// Handle citations to add to bibliography in the end
    function () {
      var added = {};
      Array.from(document.getElementsByTagName("cite")).forEach(
        function (fnl) {
          if ( ! (fnl.innerHTML in added) ) {
            document.getElementById("bibliography").innerHTML += 
              "<li>" + fnl.innerHTML + "</li>";
            added[fnl.innerHTML] = 1;
          }
        });
    }());

  // Handle title repetition
  Array.from(document.getElementsByClassName("presentationtitle")).forEach(
    function (pttl) {
    pttl.innerHTML = document.presentationtitle;
  });

  // Handle author repetition
  Array.from(document.getElementsByClassName("presentationauthor")).forEach(
    function (pa) {
    pa.innerHTML = document.presentationauthor;
  });

  console.log("Document is ready")
}(this.document));
