import axios from "axios";
import gsap from "gsap";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

axios
  .get("https://api.github.com/users/ialkamal")
  .then((response) => {
    document
      .querySelector(".cards")
      .appendChild(githubCardCreator(response.data));
  })
  .catch((err) => {
    console.log(err);
  });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];
axios
  .get("https://api.github.com/users/ialkamal/followers")
  .then((response) => {
    response.data.forEach((item) => {
      followersArray.push(item.login);
    });
    return followersArray.concat([
      "tetondan",
      "dustinmyers",
      "justsml",
      "luishrd",
      "bigknell",
      "ChadDiaz",
      "ajablanco",
      "eddieb2",
      "JavachipMom",
    ]);
  })
  .then((followers) => {
    followers.forEach((follower) => {
      axios
        .get(`https://api.github.com/users/${follower}`)
        .then((response) => {
          document
            .querySelector(".cards")
            .appendChild(githubCardCreator(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function githubCardCreator(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.src = data.avatar_url;
  card.appendChild(cardImage);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const cardH3 = document.createElement("h3");
  cardH3.classList.add("name");
  cardH3.textContent = data.name;
  cardInfo.appendChild(cardH3);

  const btn = document.createElement("button");
  btn.classList.add("button-style");
  btn.textContent = `+`;
  btn.addEventListener("click", (event) => {
    const cardInfoDiv = event.target.parentNode.parentNode;
    cardInfoDiv.offsetHeight === 192
      ? gsap.to(cardInfoDiv, { duration: 0.5, height: 500 })
      : gsap.to(cardInfoDiv, { duration: 0.5, height: 192 });
  });
  cardInfo.appendChild(btn);

  const cardP1 = document.createElement("p");
  cardP1.classList.add("username");
  data.login !== null
    ? (cardP1.textContent = data.login)
    : (cardP1.textContent = "Not Available");
  cardInfo.appendChild(cardP1);

  const cardP2 = document.createElement("p");
  data.location !== null
    ? (cardP2.textContent = `Location: ${data.location}`)
    : (cardP2.textContent = `Location: Not Available`);
  cardInfo.appendChild(cardP2);

  const cardP3 = document.createElement("p");
  const cardA = document.createElement("a");
  data.html_url !== null
    ? (cardA.href = data.html_url)
    : (cardA.href = "Not Available");
  cardA.target = "_blank";
  cardA.textContent = data.html_url;
  cardP3.textContent = `Profile: `;
  cardP3.appendChild(cardA);
  cardInfo.appendChild(cardP3);

  const cardP4 = document.createElement("p");
  data.followers !== null
    ? (cardP4.textContent = `Followers: ${data.followers}`)
    : (cardP4.textContent = `Followers: Not Available`);
  cardInfo.appendChild(cardP4);

  const cardP5 = document.createElement("p");
  data.followers !== null
    ? (cardP5.textContent = `Following: ${data.following}`)
    : (cardP5.textContent = `Following: Not Available`);
  cardInfo.appendChild(cardP5);

  const cardP6 = document.createElement("p");
  data.bio !== null
    ? (cardP6.textContent = `Bio: ${data.bio}`)
    : (cardP6.textContent = `Bio: Not Available`);
  cardInfo.appendChild(cardP6);

  const cardP7 = document.createElement("p");
  data.company !== null
    ? (cardP7.textContent = `Company: ${data.company}`)
    : (cardP7.textContent = `Company: Not Available`);
  cardInfo.appendChild(cardP7);

  const cardP8 = document.createElement("p");
  cardP8.textContent = `Blog: `;
  const cardA1 = document.createElement("a");
  data.blog !== null
    ? (cardA1.href = data.blog)
    : (cardA1.href = "Not Available");
  cardA1.target = "_blank";
  cardA1.textContent = data.blog;
  cardP8.appendChild(cardA1);
  cardInfo.appendChild(cardP8);

  const cardP9 = document.createElement("p");
  data.public_repos !== null
    ? (cardP9.textContent = `Repositories: ${data.public_repos}`)
    : (cardP9.textContent = `Repositories: Not Available`);
  cardInfo.appendChild(cardP9);

  const cardP10 = document.createElement("p");
  data.twitter_username !== null
    ? (cardP10.textContent = `Twitter: ${data.twitter_username}`)
    : (cardP10.textContent = `Twitter: Not Available`);
  cardInfo.appendChild(cardP10);

  const calenderContainer = document.createElement("div");
  // eslint-disable-next-line no-undef
  new GitHubCalendar(calenderContainer, data.login, {
    tooltips: true,
    responsive: true,
  });
  cardInfo.appendChild(calenderContainer);

  card.appendChild(cardInfo);

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
