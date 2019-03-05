<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import="java.util.List" %>
<%@ tag import="com.axboot.bjfms.utils.DepartmentUtils" %>
<%@ tag import="com.axboot.bjfms.domain.base.department.Department" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="noDepartment" required="false" %>
<%@ attribute name="name" required="false" %>
<%@ attribute name="clazz" required="false" %>
<%@ attribute name="id" required="false" %>
<%@ attribute name="dataPath" required="false" %>
<%@ attribute name="type" required="false" %>
<%@ attribute name="defaultValue" required="false" %>
<%@ attribute name="emptyValue" required="false" %>
<%@ attribute name="emptyText" required="false" %>
<%@ attribute name="style" required="false" %>

<%
    if (StringUtils.isEmpty(type)) {
        type = "select";
    }

    StringBuilder builder = new StringBuilder();

    List<Department> departments = DepartmentUtils.get();

    switch (type) {
        case "select":
            builder.append("<select class=\"form-control "+ clazz +" \"");

            if (StringUtils.isEmpty(emptyValue)) {
                emptyValue = "";
            }

            if (StringUtils.isNotEmpty(id)) {
                builder.append("id=\"" + id + "\"");
            }

            if (StringUtils.isNotEmpty(name)) {
                builder.append("name=\"" + name + "\"");
            }

            if (StringUtils.isNotEmpty(dataPath)) {
                builder.append("data-ax-path=\"" + dataPath + "\"");
            }
			// 2017.06.10 추가 : style tag 추가 -> ex)필수입력사항의 경우 border-color 설정 등...
            if (StringUtils.isNotEmpty(style)) {
                builder.append("style=\"" + style + "\"");
            }

            builder.append(">");


            if (StringUtils.isEmpty(defaultValue) && StringUtils.isNotEmpty(emptyText)) {
                builder.append(String.format("<option value=\"%s\">%s</option>", emptyValue, emptyText));
            }

            for (Department department : departments) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(department.getNoDepartment())) {
                    builder.append(String.format("<option value=\"%s\" selected>%s</option>", department.getNoDepartment(), department.getNmDepartment()));
                } else {
                    builder.append(String.format("<option value=\"%s\">%s</option>", department.getNoDepartment(), department.getNmDepartment()));
                }
            }
            builder.append("</select>");
            break;

        case "checkbox":
        	for (Department department : departments) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(department.getNoDepartment())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" checked> %s </label>", name, dataPath, department.getNoDepartment(), department.getNmDepartment()));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\"> %s </label>", name, dataPath, department.getNoDepartment(), department.getNmDepartment()));
                }
            }
            break;

        case "radio":
        	for (Department department : departments) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(department.getNoDepartment())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" checked> %s </label>", name, dataPath, department.getNoDepartment(), department.getNmDepartment()));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\"> %s </label>", name, dataPath, department.getNoDepartment(), department.getNmDepartment()));
                }
            }
            break;
    }
%>

<%=builder.toString()%>
