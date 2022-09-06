//displaying users' updates on load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("body")) {
    const body = JSON.parse(localStorage.getItem("body")).html;
    document.body.innerHTML = body;
  }
});

setTimeout(() => {
  //adding hover states for icons and extra functionality for keyboard users
  const icons = document.getElementsByName("icon");
  const iconArr = Array.from(icons);

  const hover = (icons) => {
    if (icons.tagName != "IMG") {
      for (const icon of icons) {
        const original = icon.src;
        const index = original.lastIndexOf(".");
        const replacement = original.slice(0, index) + "(hover).svg";
        icon.src = replacement;
      }
    } else {
      const original = icons.src;
      const index = original.lastIndexOf(".");
      const replacement = original.slice(0, index) + "(hover).svg";
      icons.src = replacement;
    }
  };

  const out = (icons) => {
    if (icons.tagName != "IMG") {
      for (const icon of icons) {
        const original = icon.src;
        const index = original.lastIndexOf("(");
        const replacement = original.slice(0, index) + ".svg";
        icon.src = replacement;
      }
    } else {
      const original = icons.src;
      const index = original.lastIndexOf("(");
      const replacement = original.slice(0, index) + ".svg";
      icons.src = replacement;
    }
  };

  iconArr.forEach((icon) => {
    let icons;
    if (icon.tagName != "IMG") {
      icons = icon.getElementsByTagName("img");
    } else {
      icons = icon;
    }

    icon.addEventListener("mouseover", (e) => {
      e.target.classList.add("hovered");
      hover(icons);
    });

    icon.addEventListener("focus", (e) => {
      if (!e.target.classList.contains("hovered")) {
        hover(icons);
        e.target.classList.add("focused");
      }
    });

    icon.addEventListener("mouseout", (e) => {
      e.target.classList.remove("hovered");
      out(icons);
    });

    icon.addEventListener("blur", (e) => {
      if (e.target.classList.contains("focused")) {
        out(icons);
        e.target.classList.remove("focused");
      }
    });

    icon.addEventListener("keypress", (e) => {
      e.key === "Enter" ? e.target.click() : console.error("impossible");
    });
  });

  //voting functionality
  const votes = document.getElementsByClassName("votes");
  const votesArr = Array.from(votes);

  votesArr.forEach((item) => {
    const upVote = item.querySelector(".up-vote");
    const voteCount = item.querySelector("#votes");
    const downVote = item.querySelector(".down-vote");

    upVote.addEventListener("click", () => {
      let count = parseInt(voteCount.textContent);
      voteCount.textContent = count + 1;
    });

    downVote.addEventListener("click", () => {
      let count = parseInt(voteCount.textContent);
      count !== 0
        ? (voteCount.textContent = count - 1)
        : (voteCount.textContent = count);
    });
  });

  //replying functionality
  const replies = document.getElementsByClassName("reply");
  const repliesArr = Array.from(replies);

  repliesArr.forEach((reply) => {
    reply.addEventListener("click", () => {
      const container = reply.closest(".container");
      const user = container.querySelector(".name").textContent;

      const commentBox = document.createElement("div");
      commentBox.classList = "flex comment create-comment inner";
      commentBox.setAttribute("aria-label", "comment box");

      const pic = document.createElement("img");
      pic.src = "images/avatars/image-juliusomo.png";

      const textarea = document.createElement("textarea");
      textarea.placeholder = "Add a comment...";
      textarea.value = `@${user}, `;

      const button = document.createElement("button");
      button.id = "send";
      button.setAttribute("onclick", "replied(this)");
      button.textContent = "Reply";

      commentBox.appendChild(pic);
      commentBox.appendChild(textarea);
      commentBox.appendChild(button);

      container.appendChild(commentBox);
    });
  });
}, 0);

function replied(e) {
  const commentBox = e.closest(".comment");
  const textarea = commentBox.querySelector("textarea");
  const container = commentBox.closest(".container");

  const index = textarea.value.indexOf(",") + 1;
  const tag = textarea.value.slice(0, index - 1);
  const body = textarea.value.slice(index);

  const coverOne = document.createElement("div");
  coverOne.className = "line";

  const coverTwo = document.createElement("div");
  coverTwo.className = "flex flex-col";

  const newCommentBox = document.createElement("div");
  newCommentBox.setAttribute("aria-label", "comment box");
  newCommentBox.classList = "flex comment inner";

  const votes = document.createElement("div");
  votes.setAttribute("aria-label", "votes");
  votes.classList = "flex flex-col votes";

  const upVote = document.createElement("img");
  upVote.setAttribute("aria-controls", "votes");
  upVote.setAttribute("alt", "upvote");
  upVote.setAttribute("name", "icon");
  upVote.setAttribute("tabindex", "0");
  upVote.setAttribute("src", "images/icon-plus.svg");
  upVote.classList = "up-vote";

  const voteCount = document.createElement("p");
  voteCount.setAttribute("id", "votes");
  voteCount.setAttribute("aria-live", "polite");
  voteCount.textContent = "0";
  const span = document.createElement("span");
  span.style.display = "none";
  span.setAttribute("aria-hidden", "false");
  span.textContent = "votes";
  voteCount.appendChild(span);

  const downVote = document.createElement("img");
  downVote.setAttribute("aria-controls", "votes");
  downVote.setAttribute("alt", "downvote");
  downVote.setAttribute("name", "icon");
  downVote.setAttribute("tabindex", "0");
  downVote.setAttribute("src", "images/icon-minus.svg");
  downVote.classList = "down-vote";

  votes.appendChild(upVote);
  votes.appendChild(voteCount);
  votes.appendChild(downVote);

  const details = document.createElement("div");
  details.classList = "flex flex-col details";
  details.style.width = "100%";

  const flexOne = document.createElement("div");
  flexOne.classList = "flex";

  const flexTwo = document.createElement("div");
  flexTwo.classList = "flex";

  const avatar = document.createElement("img");
  avatar.setAttribute("src", "images/avatars/image-juliusomo.png");
  avatar.classList = "pic";

  const heading = document.createElement("h1");
  heading.setAttribute("aria-label", "username");
  heading.classList = "name";
  heading.textContent = "juliusomo";

  const indicator = document.createElement("span");
  indicator.classList = "indicator";
  indicator.textContent = "you";

  const timestamp = document.createElement("span");
  timestamp.classList = "timestamp";
  timestamp.setAttribute("aria-label", "timestamp");
  timestamp.textContent = "now";

  flexTwo.appendChild(avatar);
  flexTwo.appendChild(heading);
  flexTwo.appendChild(indicator);
  flexTwo.appendChild(timestamp);

  const actions = document.createElement("div");
  actions.classList = "flex actions";

  const del = document.createElement("div");
  del.classList = "flex delete";
  del.setAttribute("tabindex", "0");
  del.setAttribute("name", "icon");
  del.setAttribute("onclick", "deleteComment(this)");

  const trash = document.createElement("img");
  trash.setAttribute("src", "images/icon-delete.svg");

  const delText = document.createElement("p");
  delText.textContent = "Delete";

  del.appendChild(trash);
  del.appendChild(delText);

  const edit = document.createElement("div");
  edit.classList = "flex edit";
  edit.setAttribute("tabindex", "0");
  edit.setAttribute("name", "icon");
  edit.setAttribute("onclick", "editComment(this)");

  const pencil = document.createElement("img");
  pencil.setAttribute("src", "images/icon-edit.svg");

  const editText = document.createElement("p");
  editText.textContent = "Edit";

  edit.appendChild(pencil);
  edit.appendChild(editText);

  actions.appendChild(del);
  actions.appendChild(edit);

  flexOne.appendChild(flexTwo);
  flexOne.appendChild(actions);

  const text = document.createElement("p");
  text.setAttribute("aria-label", "comment");
  text.setAttribute("aria-live", "polite");
  text.classList = "text";
  text.innerHTML = `<span>${tag}</span> ${body}`;

  details.appendChild(flexOne);
  details.appendChild(text);

  newCommentBox.appendChild(votes);
  newCommentBox.appendChild(details);

  coverTwo.appendChild(newCommentBox);
  coverOne.appendChild(coverTwo);

  const validation = tag.length + 2;

  if (textarea.value.length > validation) {
    commentBox.remove();
    container.appendChild(coverOne);
  }

  //add voting and hover functionality for new comments
  const icons = newCommentBox.querySelectorAll("[name='icon']");

  const hover = (icons) => {
    if (icons.tagName != "IMG") {
      for (const icon of icons) {
        const original = icon.src;
        const index = original.lastIndexOf(".");
        const replacement = original.slice(0, index) + "(hover).svg";
        icon.src = replacement;
      }
    } else {
      const original = icons.src;
      const index = original.lastIndexOf(".");
      const replacement = original.slice(0, index) + "(hover).svg";
      icons.src = replacement;
    }
  };

  const out = (icons) => {
    if (icons.tagName != "IMG") {
      for (const icon of icons) {
        const original = icon.src;
        const index = original.lastIndexOf("(");
        const replacement = original.slice(0, index) + ".svg";
        icon.src = replacement;
      }
    } else {
      const original = icons.src;
      const index = original.lastIndexOf("(");
      const replacement = original.slice(0, index) + ".svg";
      icons.src = replacement;
    }
  };

  icons.forEach((icon) => {
    let icons;
    if (icon.tagName != "IMG") {
      icons = icon.getElementsByTagName("img");
    } else {
      icons = icon;
    }

    icon.addEventListener("mouseover", (e) => {
      e.target.classList.add("hovered");
      hover(icons);
    });

    icon.addEventListener("focus", (e) => {
      if (!e.target.classList.contains("hovered")) {
        hover(icons);
        e.target.classList.add("focused");
      }
    });

    icon.addEventListener("mouseout", (e) => {
      e.target.classList.remove("hovered");
      out(icons);
    });

    icon.addEventListener("blur", (e) => {
      if (e.target.classList.contains("focused")) {
        out(icons);
        e.target.classList.remove("focused");
      }
    });

    icon.addEventListener("keypress", (e) => {
      e.key === "Enter" ? e.target.click() : console.error("impossible");
    });
  });

  const newVotes = newCommentBox.querySelectorAll(".votes");

  newVotes.forEach((item) => {
    const upVote = item.querySelector(".up-vote");
    const voteCount = item.querySelector("#votes");
    const downVote = item.querySelector(".down-vote");

    upVote.addEventListener("click", () => {
      let count = parseInt(voteCount.textContent);
      voteCount.textContent = count + 1;
    });

    downVote.addEventListener("click", () => {
      let count = parseInt(voteCount.textContent);
      count !== 0
        ? (voteCount.textContent = count - 1)
        : (voteCount.textContent = count);
    });
  });
}

setTimeout(() => {
  //adding new first-level comments
  const creator = document.querySelector("#create-comment");
  const textarea = creator.querySelector("textarea");
  const send = creator.querySelector("#send");

  send.addEventListener("click", () => {
    const newCommentBox = document.createElement("div");
    newCommentBox.setAttribute("aria-label", "comment box");
    newCommentBox.classList = "flex comment";

    const votes = document.createElement("div");
    votes.setAttribute("aria-label", "votes");
    votes.classList = "flex flex-col votes";

    const upVote = document.createElement("img");
    upVote.setAttribute("aria-controls", "votes");
    upVote.setAttribute("alt", "upvote");
    upVote.setAttribute("name", "icon");
    upVote.setAttribute("tabindex", "0");
    upVote.setAttribute("src", "images/icon-plus.svg");
    upVote.classList = "up-vote";

    const voteCount = document.createElement("p");
    voteCount.setAttribute("id", "votes");
    voteCount.setAttribute("aria-live", "polite");
    voteCount.textContent = "0";
    const span = document.createElement("span");
    span.style.display = "none";
    span.setAttribute("aria-hidden", "false");
    span.textContent = "votes";
    voteCount.appendChild(span);

    const downVote = document.createElement("img");
    downVote.setAttribute("aria-controls", "votes");
    downVote.setAttribute("alt", "downvote");
    downVote.setAttribute("name", "icon");
    downVote.setAttribute("tabindex", "0");
    downVote.setAttribute("src", "images/icon-minus.svg");
    downVote.classList = "down-vote";

    votes.appendChild(upVote);
    votes.appendChild(voteCount);
    votes.appendChild(downVote);

    const details = document.createElement("div");
    details.classList = "flex flex-col details";
    details.style.width = "100%";

    const flexOne = document.createElement("div");
    flexOne.classList = "flex";

    const flexTwo = document.createElement("div");
    flexTwo.classList = "flex";

    const avatar = document.createElement("img");
    avatar.setAttribute("src", "images/avatars/image-juliusomo.png");
    avatar.classList = "pic";

    const heading = document.createElement("h1");
    heading.setAttribute("aria-label", "username");
    heading.classList = "name";
    heading.textContent = "juliusomo";

    const indicator = document.createElement("span");
    indicator.classList = "indicator";
    indicator.textContent = "you";

    const timestamp = document.createElement("span");
    timestamp.classList = "timestamp";
    timestamp.setAttribute("aria-label", "timestamp");
    timestamp.textContent = "now";

    flexTwo.appendChild(avatar);
    flexTwo.appendChild(heading);
    flexTwo.appendChild(indicator);
    flexTwo.appendChild(timestamp);

    const actions = document.createElement("div");
    actions.classList = "flex actions";

    const del = document.createElement("div");
    del.classList = "flex delete";
    del.setAttribute("tabindex", "0");
    del.setAttribute("name", "icon");
    del.setAttribute("onclick", "deleteComment(this)");

    const trash = document.createElement("img");
    trash.setAttribute("src", "images/icon-delete.svg");

    const delText = document.createElement("p");
    delText.textContent = "Delete";

    del.appendChild(trash);
    del.appendChild(delText);

    const edit = document.createElement("div");
    edit.classList = "flex edit";
    edit.setAttribute("tabindex", "0");
    edit.setAttribute("name", "icon");
    edit.setAttribute("onclick", "editComment(this)");

    const pencil = document.createElement("img");
    pencil.setAttribute("src", "images/icon-edit.svg");

    const editText = document.createElement("p");
    editText.textContent = "Edit";

    edit.appendChild(pencil);
    edit.appendChild(editText);

    actions.appendChild(del);
    actions.appendChild(edit);

    flexOne.appendChild(flexTwo);
    flexOne.appendChild(actions);

    const text = document.createElement("p");
    text.setAttribute("aria-label", "comment");
    text.setAttribute("aria-live", "polite");
    text.classList = "text";
    text.textContent = textarea.value;

    details.appendChild(flexOne);
    details.appendChild(text);

    newCommentBox.appendChild(votes);
    newCommentBox.appendChild(details);

    if (textarea.value != "") {
      creator.before(newCommentBox);
      textarea.value = "";
    }

    //add voting and hover functionality for new comments
    const icons = newCommentBox.querySelectorAll("[name='icon']");

    const hover = (icons) => {
      if (icons.tagName != "IMG") {
        for (const icon of icons) {
          const original = icon.src;
          const index = original.lastIndexOf(".");
          const replacement = original.slice(0, index) + "(hover).svg";
          icon.src = replacement;
        }
      } else {
        const original = icons.src;
        const index = original.lastIndexOf(".");
        const replacement = original.slice(0, index) + "(hover).svg";
        icons.src = replacement;
      }
    };

    const out = (icons) => {
      if (icons.tagName != "IMG") {
        for (const icon of icons) {
          const original = icon.src;
          const index = original.lastIndexOf("(");
          const replacement = original.slice(0, index) + ".svg";
          icon.src = replacement;
        }
      } else {
        const original = icons.src;
        const index = original.lastIndexOf("(");
        const replacement = original.slice(0, index) + ".svg";
        icons.src = replacement;
      }
    };

    icons.forEach((icon) => {
      let icons;
      if (icon.tagName != "IMG") {
        icons = icon.getElementsByTagName("img");
      } else {
        icons = icon;
      }

      icon.addEventListener("mouseover", (e) => {
        e.target.classList.add("hovered");
        hover(icons);
      });

      icon.addEventListener("focus", (e) => {
        if (!e.target.classList.contains("hovered")) {
          hover(icons);
          e.target.classList.add("focused");
        }
      });

      icon.addEventListener("mouseout", (e) => {
        e.target.classList.remove("hovered");
        out(icons);
      });

      icon.addEventListener("blur", (e) => {
        if (e.target.classList.contains("focused")) {
          out(icons);
          e.target.classList.remove("focused");
        }
      });

      icon.addEventListener("keypress", (e) => {
        e.key === "Enter" ? e.target.click() : console.error("impossible");
      });
    });

    const newVotes = newCommentBox.querySelectorAll(".votes");

    newVotes.forEach((item) => {
      const upVote = item.querySelector(".up-vote");
      const voteCount = item.querySelector("#votes");
      const downVote = item.querySelector(".down-vote");

      upVote.addEventListener("click", () => {
        let count = parseInt(voteCount.textContent);
        voteCount.textContent = count + 1;
      });

      downVote.addEventListener("click", () => {
        let count = parseInt(voteCount.textContent);
        count !== 0
          ? (voteCount.textContent = count - 1)
          : (voteCount.textContent = count);
      });
    });
  });
}, 0);

setTimeout(() => {
  //deleting comments
  const remove = document.querySelector(".delete");
  remove.addEventListener("click", (e) => {
    deleteComment(e.target, false);
  });
}, 0);

function deleteComment(del, check = true) {
  const comment = del.closest(".comment");
  const line = del.closest(".line");
  const popup = document.querySelector("dialog");
  const cancel = popup.querySelector("#cancel");
  const remove = popup.querySelector("#delete");

  popup.showModal();

  cancel.addEventListener("click", () => {
    popup.close();
  });

  remove.addEventListener("click", () => {
    if (line && check) line.remove();
    comment.remove();
    popup.close();
  });
}

setTimeout(() => {
  //editing comments
  const edit = document.querySelector(".edit");
  edit.addEventListener("click", (e) => {
    editComment(e.target);
  });
}, 0);

function editComment(edit) {
  const comment = edit.closest(".comment");
  const text = comment.querySelector(".text");
  const details = edit.closest(".details");

  const div = document.createElement("div");
  div.className = "flex create-comment";
  div.style.flexWrap = "wrap";
  div.style.padding = ".5em";

  const textarea = document.createElement("textarea");
  textarea.value = text.innerText;
  textarea.style.minHeight = "7em";
  textarea.style.width = "100%";

  const button = document.createElement("button");
  button.textContent = "Update";
  button.style.marginLeft = "auto";
  button.setAttribute("onclick", "update(this)");

  div.appendChild(textarea);
  div.appendChild(button);

  details.style.width = "100%";
  details.replaceChild(div, text);
}

function update(target) {
  const details = target.closest(".details");
  const parent = target.closest(".create-comment");
  const textarea = parent.querySelector("textarea");

  const index = textarea.value.indexOf(" ") + 1;
  const tag = textarea.value.slice(0, index - 1);
  const body = textarea.value.slice(index);

  const text = document.createElement("p");
  text.setAttribute("aria-label", "comment");
  text.setAttribute("aria-live", "polite");
  text.classList = "text";
  tag.startsWith("@")
    ? (text.innerHTML = `<span>${tag}</span> ${body}`)
    : (text.innerText = textarea.value);

  const validation = tag.length + 2;

  if (textarea.value.length > validation && tag.startsWith("@")) {
    details.replaceChild(text, parent);
  } else if (textarea.value != "" && !tag.startsWith("@")) {
    details.replaceChild(text, parent);
  }
}

const timestamps = document.getElementsByClassName("timestamp");
const timeArr = Array.from(timestamps);

const current = Date.now();
timeArr[0].setAttribute("data-time", `${current - 2628002880}`);
timeArr[1].setAttribute("data-time", `${current - 2 * 604800000}`);
timeArr[2].setAttribute("data-time", `${current - 604800000}`);
timeArr[3].setAttribute("data-time", `${current - 2 * 86400000}`);

setTimeout(() => {
  function updateTime() {
    const timestamps = document.querySelectorAll(".timestamp");

    timestamps.forEach((timestamp) => {
      if (!timestamp.getAttribute("data-time")) {
        timestamp.setAttribute("data-time", Date.now());
      }

      const datum = Number(timestamp.getAttribute("data-time"));
      const difference = Date.now() - datum;

      const year = Math.floor(difference / 31536000000);
      const month = Math.floor(difference / 2628002880);
      const week = Math.floor(difference / 604800000);
      const day = Math.floor(difference / 86400000);
      const hour = Math.floor(difference / 3600000);
      const minute = Math.floor(difference / 60000);

      if (timestamp.textContent.match("now")) {
        timestamp.textContent =
          minute == 1
            ? `${minute} minute ago`
            : minute > 1
            ? `${minute} minutes ago`
            : `now`;
      } else if (timestamp.textContent.match("minute")) {
        timestamp.textContent =
          minute >= 2 && minute < 60
            ? `${minute} minutes ago`
            : hour == 1
            ? `${hour} hour ago`
            : minute == 1
            ? `${minute} minute ago`
            : `${hour} hours ago`;
      } else if (timestamp.textContent.match("hour")) {
        timestamp.textContent =
          hour >= 2 && hour < 24
            ? `${hour} hours ago`
            : day == 1
            ? `${day} day ago`
            : hour == 1
            ? `${hour} hour ago`
            : `${day} days ago`;
      } else if (timestamp.textContent.match("day")) {
        timestamp.textContent =
          day >= 2 && day < 7
            ? `${day} days ago`
            : week == 1
            ? `${week} week ago`
            : day == 1
            ? `${day} day ago`
            : `${week} weeks ago`;
      } else if (timestamp.textContent.match("week")) {
        timestamp.textContent =
          week >= 2 && week < 4
            ? `${week} weeks ago`
            : month == 1
            ? `${month} month ago`
            : week == 1
            ? `${week} week ago`
            : `${month} months ago`;
      } else if (timestamp.textContent.match("month")) {
        timestamp.textContent =
          month >= 2 && month < 12
            ? `${month} months ago`
            : year == 1
            ? `${year} year ago`
            : month == 1
            ? `${month} month ago`
            : `${year} years ago`;
      } else if (timestamp.textContent.match("year")) {
        timestamp.textContent =
          year > 1 ? `${year} years ago` : `${year} year ago`;
      }
    });
  }

  updateTime();
  setInterval(updateTime, 60000);
}, 0);

//saving users' updates on unload
window.addEventListener("unload", () => {
  const body = {
    html: document.body.innerHTML,
  };

  localStorage.setItem("body", JSON.stringify(body));
});
