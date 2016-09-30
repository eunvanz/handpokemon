window.onbeforeunload = catchExit;
var exitable = false;

function catchExit() {
  if (!exitable) {
    return "이 페이지를 벗어나면 시합 패배 처리됩니다.";
  }
}
