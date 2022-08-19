export default function() {
  return [
    {
      title: "대시보드",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons"></i>',
      htmlAfter: ""
    },
    {
      title: "통계",
      htmlBefore: '<i class="material-icons"></i>',
      to: "/blog-posts",
    },
    {
      title: "로그",
      htmlBefore: '<i class="material-icons"></i>',
      to: "/tables",
    },
    {
      title: "설정",
      htmlBefore: '<i class="material-icons"></i>',
      to: "/user-profile-lite",
    },
  ];
}
