const getFocusedElementPrompt = async () => {
  // Get the focused element
  const focusedElement = document.activeElement;
  const prompt = focusedElement.innerText;
  try {
    const res = await fetch("http://localhost:8000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Required for JSON parsing in Express
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    console.log("Data: ", data);
  } catch (error) {
    console.log("Error: ", error);
  }

  console.log("Prompt: ", prompt);
};

async function replaceEmbTags() {
  // Find all span elements containing <emb ... emb> or &lt;emb ... emb&gt;

  // console.log("Inside replaceEmbTags");
  // const spans = document.querySelectorAll("span");
  // console.log("Spans: ", spans);

  const focusedElement = document.activeElement; // Get the focused element

  if (focusedElement) {
    // Check if a button with id "myBtn" already exists inside the span
    if (
      focusedElement.innerText != "" &&
      !focusedElement.querySelector("#myBtn")
    ) {
      const btn = document.createElement("button");
      btn.id = "myBtn";
      btn.innerText = "->";
      btn.style.marginTop = "5px"; // Add some spacing
      btn.onclick = getFocusedElementPrompt; // Call the function when the button is clicked

      // Append the button to the focused span
      focusedElement.appendChild(btn);
    }
  }

  // console.log("Spans: ", focusedSpan.innerHTML, focusedSpan.chi);

  // focusedSpan.innerHTML = "Hello Testing";
  // focusedSpan.appendChild(document.createTextNode("Hello Testing"));
  // spans.forEach((span) => {
  //   const embRegex = /<emb\s*([^<]*)\s*emb>/g;
  //   let match;
  //   const decodedHTML = span.innerHTML
  //     .replace(/&lt;/g, "<")
  //     .replace(/&gt;/g, ">");

  //   while ((match = embRegex.exec(decodedHTML)) !== null) {
  //     const match1 = match;

  //     console.log("MATCHHHHH: ", match1);

  //     const url1 = match[1].trim();
  //     console.log("URL1: ", url1);

  //     //       const defaultResponse = {
  //     //         span: "defaultSpan",
  //     //         match: "defaultMatch",

  //     //         htmlText: `<html>

  //     // <head>
  //     //     <title>Parent Page with iframe</title>
  //     //     <style>
  //     //         .iframe-container {
  //     //             width: 100%;
  //     //             display: flex;
  //     //             justify-content: center;
  //     //             // max-width: 800px;
  //     //             // margin: 20px auto;
  //     //             // border: 1px solid #ccc;
  //     //         }

  //     //         iframe {
  //     //           width: 400px;
  //     //           height: 500px;
  //     //           border: none;
  //     //           border-radius: 15px;
  //     //         }
  //     //     </style>
  //     // </head>

  //     // <body>
  //     //     <div class="iframe-container">
  //     //         <iframe src="https://embedly-nine.vercel.app/custom/${url1}" title="Embedded React App"
  //     //             allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
  //     //             sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
  //     //     </div>
  //     // </body>

  //     // </html>
  //     // `,
  //     //         jsCode: ``,
  //     //       };

  //     // add html content
  //     // span.innerHTML = defaultResponse.htmlText;
  //   }
  // });
}

// Run the function every 1 second

console.log("Running replaceEmbTags");
setInterval(replaceEmbTags, 1000);
