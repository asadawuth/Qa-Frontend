// import TimeAgo from "javascript-time-ago";
// import th from "javascript-time-ago/locale/th";

// // Add Thai locale
// TimeAgo.addLocale(th);

// // Create a TimeAgo instance with Thai locale
// const timeAgo = new TimeAgo("th-TH");

// const formatTimeAgo = (date) => timeAgo.format(new Date(date), "mini-now");
// export default formatTimeAgo;

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
const formatTimeAgo = (date) => timeAgo.format(new Date(date), "mini-now");
export default formatTimeAgo;
