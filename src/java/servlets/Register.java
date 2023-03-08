/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonObject;
import database.init.DB_Connection;
import database.tables.EditDoctorTable;
import database.tables.EditSimpleUserTable;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.SimpleUser;
import java.sql.Connection;
import java.sql.Statement;
import mainClasses.Doctor;

/**
 *
 * @author Kesenia
 */
@WebServlet(name = "Register", urlPatterns = {"/Register"})
public class Register extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        EditSimpleUserTable jc = new EditSimpleUserTable();
        SimpleUser p = new SimpleUser();
        String json = jc.simpleUserToJSON(p); //personToJSON(p);
        response.setStatus(200);
        response.getWriter().write(json);

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    public String getJSONFromAjax(BufferedReader reader) throws IOException {
        StringBuilder buffer = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            line = filter(line);  // PUT THIS LINE IN COMMENTS IF YOU WANT NO INPUT FILTER
            buffer.append(line);
        }
        String data = buffer.toString();
        return data;
    }

    public static String filter(String input) {
        if (!hasSpecialChars(input)) {
            return (input);
        }
        StringBuffer filtered = new StringBuffer(input.length());
        char c;
        for (int i = 0; i < input.length(); i++) {
            c = input.charAt(i);
            switch (c) {
                case '<':
                    filtered.append("&lt;");
                    break;
                case '>':
                    filtered.append("&gt;");
                    break;
                //case '&':
                // filtered.append("&amp;");
                // break;
                default:
                    filtered.append(c);
            }
        }
        return (filtered.toString());
    }

    private static boolean hasSpecialChars(String input) {
        boolean flag = false;
        if ((input != null) && (input.length() > 0)) {
            char c;
            for (int i = 0; i < input.length(); i++) {
                c = input.charAt(i);
                switch (c) {
                    case '<':
                        flag = true;
                        break;
                    case '>':
                        flag = true;
                        break;
                    // case '&':
                    // flag = true;
                    // break;
                }
            }
        }
        return (flag);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String JSON = this.getJSONFromAjax(request.getReader());

        EditSimpleUserTable jc = new EditSimpleUserTable();
        SimpleUser p = jc.jsonToSimpleUser(JSON);

        EditDoctorTable dc = new EditDoctorTable();
        Doctor d = dc.jsonToDoctor(JSON);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt_user = con.createStatement();
            ResultSet rs_user;
            String username = p.getUsername(); //request.getParameter("username");
            rs_user = stmt_user.executeQuery("SELECT * FROM users WHERE username = '" + username + "'");

            Statement stmt_email = con.createStatement();
            ResultSet rs_email;
            String email = p.getEmail(); //request.getParameter("email");
            rs_email = stmt_email.executeQuery("SELECT * FROM users WHERE email = '" + email + "'");

            Statement stmt_amka = con.createStatement();
            ResultSet rs_amka;
            String amka = p.getAmka(); //request.getParameter("amka");
            rs_amka = stmt_amka.executeQuery("SELECT * FROM users WHERE amka = '" + amka + "'");

            //////// DOCTORS ///////
            Statement stmt_user_doctor = con.createStatement();
            ResultSet rs_user_doctor;
            String username_doctor = d.getUsername(); //request.getParameter("username");
            rs_user_doctor = stmt_user_doctor.executeQuery("SELECT * FROM doctors WHERE username = '" + username_doctor + "'");

            Statement stmt_email_doctor = con.createStatement();
            ResultSet rs_email_doctor;
            String email_doctor = d.getEmail(); //request.getParameter("email");
            rs_email_doctor = stmt_email_doctor.executeQuery("SELECT * FROM doctors WHERE email = '" + email_doctor + "'");

            Statement stmt_amka_doctor = con.createStatement();
            ResultSet rs_amka_doctor;
            String amka_doctor = d.getAmka(); //request.getParameter("amka");
            rs_amka_doctor = stmt_amka_doctor.executeQuery("SELECT * FROM doctors WHERE amka = '" + amka_doctor + "'");

            ///////////////////////
            if (rs_user.next() || rs_user_doctor.next()) {
                response.setStatus(403);
                JsonObject jo = new JsonObject();
                jo.addProperty("error", "Username Already Taken");
                response.getWriter().write(jo.toString());
            } else if (rs_email.next() || rs_email_doctor.next()) {
                response.setStatus(405);
                JsonObject jo = new JsonObject();
                jo.addProperty("error", "Email Already Taken");
                response.getWriter().write(jo.toString());
            } else if (rs_amka.next() || rs_amka_doctor.next()) {
                response.setStatus(406);
                JsonObject jo = new JsonObject();
                jo.addProperty("error", "Amka Already Taken");
                response.getWriter().write(jo.toString());
            } else {
                response.setStatus(200);
                response.getWriter().write(JSON);

                if (p.getUsertype().equals("regular")) {
                    jc.addSimpleUserFromJSON(JSON);
                } else if (p.getUsertype().equals("doctor")) {
                    dc.addDoctorFromJSON(JSON);
                }
            }

        } catch (Exception e) {
            response.setStatus(409);
            System.err.println("Got an exception! - doPost Register.java");
            System.err.println(e.getMessage());
        }

    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
