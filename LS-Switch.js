/*
 * LOCAL SHUFFLE
 * Redemption and music download system
 *
 * IMPORTANT:
 * This file is safe to put on GitHub Pages.
 *
 * DO NOT put your Supabase service-role key here.
 *
 * After we create the Supabase Edge Function, replace
 * the URL below with your actual Edge Function URL.
 */

const REDEEM_FUNCTION_URL =
  "https://YOUR-PROJECT-REF.supabase.co/functions/v1/redeem";


const input = document.getElementById("myInput");
const button = document.getElementById("myButton");
const status = document.getElementById("status");

const downloadArea = document.getElementById("downloadArea");
const downloadLink = document.getElementById("downloadLink");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");


function showStatus(message, type = "") {

  status.textContent = message;

  status.className = "status";

  if (type) {
    status.classList.add(type);
  }

}


function hideDownload() {

  downloadArea.hidden = true;

  downloadLink.removeAttribute("href");

}


async function redeemSong() {

  const token = input.value.trim();

  hideDownload();

  if (!token) {

    showStatus(
      "Please enter your redemption code.",
      "error"
    );

    return;
  }


  button.disabled = true;

  showStatus(
    "Checking your redemption code..."
  );


  try {

    const response = await fetch(
      REDEEM_FUNCTION_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          token: token
        })
      }
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "We couldn't redeem that code."
      );

    }


    if (!data.signed_url) {

      throw new Error(
        "The song was found, but no download link was created."
      );

    }


    songTitle.textContent =
      data.song_title || "Your song is ready!";


    if (data.artist) {

      artistName.textContent =
        "Artist: " + data.artist;

    } else {

      artistName.textContent = "";

    }


    downloadLink.href = data.signed_url;


    if (data.filename) {

      downloadLink.download =
        data.filename;

    }


    downloadArea.hidden = false;


    showStatus(
      "Your song is ready!",
      "success"
    );

  }


  catch (error) {

    console.error(
      "Local Shuffle redemption error:",
      error
    );


    showStatus(
      error.message ||
      "Something went wrong. Please try again.",
      "error"
    );

  }


  finally {

    button.disabled = false;

  }

}


/*
 * Clicking the button redeems the code.
 */

button.addEventListener(
  "click",
  redeemSong
);


/*
 * Pressing Enter in the code box
 * does the same thing.
 */

input.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      event.preventDefault();

      redeemSong();

    }

  }
);
