// index.htmlの公式ムービー表示を切り替える設定
window.RECREATION_MOVIE_CONFIG = {
  mode: "live",//ここmovie=公式ムービー、live=YouTubeライブ配信
  contents: {
    movie: {
      heading: "公式ムービー",
      subheading: "OFFICIAL PROMOTIONAL VIDEO",
      src: "https://www.youtube-nocookie.com/embed/ZlrrUhwEPuE?rel=0&modestbranding=1&iv_load_policy=3&loop=1&playlist=ZlrrUhwEPuE",
      title: "RE:CREATION 2026 公式プロモーション映像"
    },
    live: {
      heading: "YouTubeライブ配信",
      subheading: "YOUTUBE LIVE STREAM",
      src: "https://www.youtube.com/embed/Apq1kyrnN9U?si=EC7YECGJ6wyW0QRb",
      title: "RE:CREATION 2026 YouTubeライブ配信"
    }
  }
};
