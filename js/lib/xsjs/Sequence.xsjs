var errorBody = "{message:Data unavailable}";
try {
	var body = "";
	var conn = $.db.getConnection();
	var docType = $.request.parameters.get("DocType");
	var APPNUM = '';

	//Type
	switch (docType) {
	case "MaterialChange":
	case "MaterialCreate":
	case "BatchNo":
		var pStmt = conn.prepareStatement("select \"CIEHANA00.db::ZBATCHNO\".NEXTVAL from DUMMY ");
		var rs = pStmt.executeQuery(); //获取到流水号传至 APPNUM
		while (rs.next()) {
			APPNUM = rs.getString(1);
		}
		break;
	default:
		break;
	}

	pStmt.close();
	conn.close();
	body = JSON.stringify({
		"Number": APPNUM
	});
	$.response.contentType = "application/json";
	$.response.setBody(body);
	$.response.status = $.net.http.OK;
} catch (e) {
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	console.log(e.message);
	$.response.setBody(JSON.stringify(errorBody));
}