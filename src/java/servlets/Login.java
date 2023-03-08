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
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Doctor;
import mainClasses.SimpleUser;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Kesenia
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

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
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Login</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Login at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
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

        // USER LOGIN - CHECK USERNAME AND PASSWORD
        response.setContentType("text/html;charset=UTF-8");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        HttpSession session = request.getSession(true);

        try (PrintWriter out = response.getWriter()) {
            EditSimpleUserTable eut = new EditSimpleUserTable();
            SimpleUser su = eut.databaseToSimpleUser(username, password);

            if (session.getAttribute("username") != null) {
                eut = new EditSimpleUserTable();
                su = eut.databaseToSimpleUserLoggedIn(session.getAttribute("username").toString());
                String json = eut.simpleUserToJSON(su);
                out.println(json);
                response.setStatus(200);
            } else if (su != null) {
                String json = eut.simpleUserToJSON(su);
                out.println(json);
                response.setStatus(200);
            } else if (su == null) {
                response.setStatus(404);
            }
        } catch (SQLException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        }

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
            buffer.append(line);
        }
        String data = buffer.toString();
        return data;
    }

    
    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("IN DOPOST");

        String JSON = this.getJSONFromAjax(request.getReader());

        EditSimpleUserTable jc = new EditSimpleUserTable();
        SimpleUser p = jc.jsonToSimpleUser(JSON);

        EditDoctorTable dc = new EditDoctorTable();
        Doctor d = dc.jsonToDoctor(JSON);
        //PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();

            String username = p.getUsername(); //request.getParameter("username");
            String password = p.getPassword(); //request.getParameter("password");
          

            
            Statement stmt_user = con.createStatement();
            ResultSet rs_user;
            rs_user = stmt_user.executeQuery("SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'");

            //////// DOCTORS ///////
            Statement stmt_user_doctor = con.createStatement();
            ResultSet rs_user_doctor;
            rs_user_doctor = stmt_user_doctor.executeQuery("SELECT * FROM doctors WHERE username = '" + username + "' AND password = '" + password + "' AND certified = '" + "1" + "' ");
            ///////////////////////
            if (rs_user.next()) { //  SIMPLE USER FOUND
                HttpSession session = request.getSession(true);
                session.setAttribute("username", username);
                response.setStatus(200);
                response.getWriter().write(JSON);

            } else if (rs_user_doctor.next()) { //  DOCTOR FOUND
                HttpSession session = request.getSession(true);
                session.setAttribute("username", username);
                System.out.println("username of doctor iss: "+ username);
                response.setStatus(201);
                response.getWriter().write(JSON);
                
            } else if (!rs_user_doctor.next()) { 
                 response.setStatus(402); // User Not Found
                JsonObject jo = new JsonObject();
                jo.addProperty("error", "User not Found");
                response.getWriter().write(jo.toString());
            } else {
                response.setStatus(405); // User Not Found
                JsonObject jo = new JsonObject();
                jo.addProperty("error", "User not Found");
                response.getWriter().write(jo.toString());

            }

        } catch (Exception e) {
            response.setStatus(409);
            System.err.println("Got an exception! = doPost Login.java");
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
