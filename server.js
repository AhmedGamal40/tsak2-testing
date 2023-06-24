self.addEventListener("install", (event) => {
    // console.log('we are in install phase');

    event.waitUntil(
      caches
        .open("simpleApp-1")
        .then((cache) => {
          cache.addAll(["iphone.html", "style.css", "iphone.js" , "index.html"]);
        })
        .catch((err) => console.log(err))
    );
  });
  
  self.addEventListener("activate", () => {
    console.log("we are in activated phase");
  });

  
  self.addEventListener("fetch", (event) => {
    console.log("Network Request:", event.request.url);
    event.respondWith(
      caches
        .match(event.request)
        .then((file) => {
          if (file) {
              console.log('founded in cash ');
            return file;
          }
          console.log("not founded in cash,go to network to get files");
          return fetch(event.request.url);
        })
        .catch((err) => console.log(err))
    );
  });