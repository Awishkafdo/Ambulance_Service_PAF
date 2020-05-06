<%@page import="model.Ambulance"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <% 
		    if (request.getParameter("id") != null)
		{
		  Ambulance obj = new Ambulance();
		 String stsMsg = "";
		//Insert--------------------------
		if (request.getParameter("hidItemIDSave") == "")
		 {
		 stsMsg = obj.addAmbulance(request.getParameter("vBrand"),
		 request.getParameter("vModel"),
		 request.getParameter("aPhone"));
		 }
		else//Update----------------------
		 {
		 stsMsg = obj.updateAmbulance(request.getParameter("hidItemIDSave"),
				 request.getParameter("vBrand"), 
				 request.getParameter("vModel"), 
				 request.getParameter("aPhone"));
		
		 }
		 session.setAttribute("statusMsg", stsMsg);
		}
		//Delete-----------------------------
		if (request.getParameter("hidItemIDDelete") != null)
		{
		 Ambulance obj = new Ambulance();
		 String stsMsg =
		 obj.removeAmbulance(request.getParameter("hidItemIDDelete"));
		 session.setAttribute("statusMsg", stsMsg);
		}
		%>
		
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Ambulance details</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/ambulance.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1 class="m-3">Student details</h1>
					<form id="formItem" name="formAmbulace" method="post" action="items.jsp">
 						Vehicle brand:
						<input id="vBrand" name="vBrand" type="text" class="form-control form-control-sm">
						<br> Vehicle Model:
						<input id="vModel" name="vModel" type="text" class="form-control form-control-sm">
						<br> Ambulance phone number:
						<input id="aPhone" name="aPhone" type="text" class="form-control form-control-sm">
						<br>
						<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
						<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
					</form>
					
					<div id="alertSuccess" class="alert alert-success">
						<%
							out.print(session.getAttribute("statusMsg"));
						%>
					</div>
					<div id="alertError" class="alert alert-danger"></div>
					
					<br>
					<%
						Ambulance obj =new Ambulance();
						out.print(obj.readItems());
					%>
					
					
				
			</div>
		</div>
		
		<br>
		
		<div class="row">
			<div class="col-12" id="colStudents">
			</div>
		</div>
	</div>

</body>
</html>