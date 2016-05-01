function viewCollection(nickname) {
	var userForCollection = escape(encodeURIComponent(nickname));
	location.href='main.do?action=viewCollection&userForCollection=' + userForCollection;
}