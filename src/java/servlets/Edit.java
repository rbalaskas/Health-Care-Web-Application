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
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Doctor;
import mainClasses.SimpleUser;

/**
 *
 * @author Kesenia
 */
@WebServlet(name = "Edit", urlPatterns = {"/Edit"})
public class Edit extends HttpServlet {

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
            out.println("<title>Servlet Edit</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Edit at " + request.getContextPath() + "</h1>");
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
        
        response.setContentType("text/html;charset=UTF-8");

        try(PrintWriter out = response.getWriter()) {
            
            EditSimpleUserTable edt = new EditSimpleUserTable();
          
             ArrayList<String> usersList = edt.getUsers();

            if (usersList != null) {
                
                out.println(usersList.toString());
                response.setStatus(200);

            } else {
                response.setStatus(404);
            }
        } catch (Exception e) {
            System.err.println("Got an exception - doGet Certified Doctors! ");
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


        String JSON = this.getJSONFromAjax(request.getReader());

        EditSimpleUserTable jc = new EditSimpleUserTable();
        SimpleUser p = jc.jsonToSimpleUser(JSON);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();

            String email = p.getEmail();
            String username = p.getUsername();
            String password = p.getPassword();
            String firstname = p.getFirstname();
            String lastname = p.getLastname();
            String birthdate = p.getBirthdate();
            String gender = p.getGender();
            String country = p.getCountry();
            String city = p.getCity();
            String address = p.getAddress();
            Double lat = p.getLat();
            Double lon = p.getLon();
            String telephone = p.getTelephone();
            int height = p.getHeight();
            double weight = p.getWeight();
            int blooddonor = p.getBlooddonor();
            String bloodtype = p.getBloodtype();
      

            Statement stmt_user = con.createStatement();
            ResultSet rs_user;
            rs_user = stmt_user.executeQuery("SELECT * FROM users WHERE username != '" + username + "' AND email = '" + email + "'");

            //////// DOCTORS ///////
            Statement stmt_user_doctor = con.createStatement();
            ResultSet rs_user_doctor;
            rs_user_doctor = stmt_user_doctor.executeQuery("SELECT * FROM doctors WHERE username != '" + username + "' AND email = '" + email + "'");

            ///////////////////////
            if (rs_user.next() || rs_user_doctor.next()) {
                response.setStatus(405); // Email taken

            } else {
                response.setStatus(200); // Email Not Taken - Edit Successful
                jc.updateSimpleUserAll(username, email, password, firstname, lastname, birthdate, gender, country, city, address, lat, lon, telephone, height, weight, blooddonor, bloodtype);
             

        }
        } catch (Exception e) {
            response.setStatus(409);
            System.err.println("Got an exception! - doPost Edit.java ");
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
