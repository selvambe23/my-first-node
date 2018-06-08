export default {
  fbShare: function () {
    if (location.href.indexOf("totalquartz360.com") >= 0) {
      gtag('event', 'click', { 'event_category': 'button', 'event_label': 'Facebook Share', 'value': 'Facebook Share' });
    }
    var inviteUrl = $('#inviteLink').text();
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + inviteUrl, "_blank");
  },
  twitterShare: function () {
    if (location.href.indexOf("totalquartz360.com") >= 0) {
      gtag('event', 'click', { 'event_category': 'button', 'event_label': 'Twitter Share', 'value': 'Twitter Share' });
    }
    var inviteUrl = $('#inviteLink').text();
    window.open("https://twitter.com/intent/tweet?text=share game&amp;url=" + inviteUrl, "_blank");
  },
  copyToClipboard: function () {
    if (location.href.indexOf("totalquartz360.com") >= 0) {
      gtag('event', 'click', { 'event_category': 'button', 'event_label': 'Copy to clipboard Share', 'value': 'Copy to clipboard' });
    }
    var text = document.getElementById('inviteLink');
    var range = document.createRange();
    range.selectNodeContents(text);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy")
    $('#copyToClipboard span').hide()
    $('#clipboard').show()
  }

}
