$(() => {
  //update name on card as user types in name input
  $("#name").on("input", () => {
    const regex = /^\s+/;
    if (!$("#name").val().match(regex) && $("#name").val() != "") {
      $(".names").text($("#name").val().toUpperCase());
    } else {
      $(".names").text("JANE APPLESEED");
    }

    //undo error if any
    undo($("#name"));
  });

  //update number on card as user types in name input
  $("#number").on("input", () => {
    const number = $("#number").val().split(" ").join("").toUpperCase();
    if (number.length > 12) {
      $(".numbers").eq(3).text(number.slice(12, 16).padEnd(4, "0"));
      $(".numbers").eq(2).text(number.slice(8, 12).padEnd(4, "0"));
      $(".numbers").eq(1).text(number.slice(4, 8).padEnd(4, "0"));
      $(".numbers").eq(0).text(number.slice(0, 4).padEnd(4, "0"));
    } else if (number.length > 8) {
      $(".numbers").eq(2).text(number.slice(8, 12).padEnd(4, "0"));
      $(".numbers").eq(1).text(number.slice(4, 8).padEnd(4, "0"));
      $(".numbers").eq(0).text(number.slice(0, 4).padEnd(4, "0"));

      $(".numbers").eq(3).text("0000"); //for deleting sake
    } else if (number.length > 4) {
      $(".numbers").eq(1).text(number.slice(4, 8).padEnd(4, "0"));
      $(".numbers").eq(0).text(number.slice(0, 4).padEnd(4, "0"));

      $(".numbers").eq(2).text("0000"); //for deleting sake
    } else if (number.length <= 4 && number.length > 0) {
      $(".numbers").eq(0).text(number.slice(0, 4).padEnd(4, "0"));

      $(".numbers").eq(1).text("0000"); //for deleting sake
    } else {
      $(".numbers").eq(0).text("0000");
    }

    //undo error if any
    undo($("#number"));
  });

  //update expiry date
  $("#date").on("input", () => {
    const month = $("#date").val();
    const yearDisplay = $(".dates").text().slice(2);
    $(".dates").text(month.padEnd(2, "0") + yearDisplay);

    //undo error if any
    undo($(".flexInner"), $("#date"));
  });

  $("#date")
    .next()
    .on("input", () => {
      const year = $("#date").next().val();
      const monthDisplay = $(".dates").text().slice(0, 2);
      $(".dates").text(monthDisplay + "/" + year.padEnd(2, "0"));

      //undo error if any
      undo($(".flexInner"), $("#date").next());
    });

  //update cvc
  $("#cvc").on("input", () => {
    $(".back span").text($("#cvc").val().padEnd(3, "0"));

    //undo error if any
    undo($("#cvc"));
  });

  //validate form
  $("form").submit((e) => {
    e.preventDefault();

    //cardholder name
    if (!$("#name").val() || /^\s+/.test($("#name").val())) {
      error($("#name"), "Can't be blank");

      clear($("#name"));
    }

    if (
      $("#name")
        .val()
        .match(/[^a-z\s]/i)
    ) {
      error($("#name"), "Wrong format, letters only");
    }

    //card number
    if (
      $("#number")
        .val()
        .match(/[^0-9\s]/)
    ) {
      error($("#number"), "Wrong format, numbers only");
    }

    if (!$("#number").val() || /^\s+/.test($("#number").val())) {
      error($("#number"), "Can't be blank");

      clear($("#number"));
    }

    //expiry date
    if (
      (!$("#date").val() || /^\s+/.test($("#date").val())) &&
      (!$("#date").next().val() || /^\s+/.test($("#date").next().val()))
    ) {
      error($(".flexInner"), "Can't be blank", $("#date"), $("#date").next());
    } else if (!$("#date").val() || /^\s+/.test($("#date").val())) {
      error($(".flexInner"), "Can't be blank", $("#date"));
    } else if (
      !$("#date").next().val() ||
      /^\s+/.test($("#date").next().val())
    ) {
      error($(".flexInner"), "Can't be blank", $("#date").next());
    }

    //cvc
    if (!$("#cvc").val() || /^\s+/.test($("#cvc").val())) {
      error($("#cvc"), "Can't be blank");
    }

    setTimeout(checker, 0);
  });

  //continuation
  $(".pop input[type='submit']").click(() => {
    const input = $("form input[type='text']");

    for (let i = 0; i < input.length; i++) {
      input.eq(i).val("");
    }

    $(".names").text("JANE APPLESEED");

    for (let i = 0; i < 4; i++) {
      $(".numbers").eq(i).text("0000");
    }

    $(".dates").text("00/00");

    $(".back span").text("000");

    $("form").css("display", "block");
    $(".pop").css("display", "none");
  });

  //generating custom error
  function error(element, message, cause1, cause2) {
    const errorElem = $("<p></p>").text(message);
    errorElem.css({
      color: "var(--red)",
      "font-size": ".8rem",
      "margin-top": "-.5em",
    });
    element.after(errorElem);

    if (!cause1) {
      element.css("border", "2px solid var(--red)");
    } else {
      cause1.css("border", "2px solid var(--red)");
    }

    if (cause2) {
      cause2.css("border", "2px solid var(--red)");
    }
  }

  //undo error
  function undo(element, cause) {
    const root = document.querySelector(":root");
    const style = getComputedStyle(root).getPropertyValue("--red").trim();

    if (!cause) {
      const check = $(element).css("border-color").trim();
      if (check == style) {
        element.next().remove();
        element.css("border", "");
      }
    } else {
      const check = $(cause).css("border-color").trim();
      if (check == style) {
        element.next().remove();
        cause.css("border", "");
      }
    }
  }

  //clearing fields
  function clear(element) {
    setTimeout(() => {
      $(element).val("");
    }, 0);
  }

  //confirmed
  function checker() {
    const root = document.querySelector(":root");
    const style = getComputedStyle(root).getPropertyValue("--red").trim();
    const input = $("form input[type='text']");

    for (let i = 0; i < input.length; i++) {
      if (input.eq(i).css("border-color").trim() == style) {
        return;
      }
    }

    $("form").css("display", "none");
    $(".pop").css("display", "block");
  }
});
