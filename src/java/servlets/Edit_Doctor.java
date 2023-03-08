/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.init.DB_Connection;
import database.tables.EditDoctorTable;
import database.tables.EditSimpleUserTable;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.Doctor;
import mainClasses.SimpleUser;

/**
 *
 * @author USER
 */
@WebServlet(name = "Edit_Doctor", urlPatterns = {"/Edit_Doctor"})
public class Edit_Doctor extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
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
        
        // USER LOGIN - CHECK USERNAME AND PASSWORD
        response.setContentType("text/html;charset=UTF-8");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        HttpSession session = request.getSession(true);

        try (PrintWriter out = response.getWriter()) {
            EditDoctorTable eut = new EditDoctorTable();
            Doctor su = eut.databaseToSimpleUser(username, password);

            if (session.getAttribute("username") != null) {
                eut = new EditDoctorTable();
                su = eut.databaseToSimpleUserLoggedIn(session.getAttribute("username").toString());
                String json = eut.doctorToJSON(su);
                out.println(json);
                response.setStatus(200);
                
            } 
            else if (su != null) {
                String json = eut.doctorToJSON(su);
                out.println(json);
                response.setStatus(200);
            } 
            else if (su == null) {
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
    
    
    
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String JSON = this.getJSONFromAjax(request.getReader());

        EditDoctorTable jc = new EditDoctorTable();
        Doctor d = jc.jsonToDoctor(JSON);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();

            String email = d.getEmail();
            String username = d.getUsername();
            String password = d.getPassword();
            String firstname = d.getFirstname();
            String lastname = d.getLastname();
            String birthdate = d.getBirthdate();
            String gender = d.getGender();
            String country = d.getCountry();
            String city = d.getCity();
            String address = d.getAddress();
            Double lat = d.getLat();
            Double lon = d.getLon();
            String telephone = d.getTelephone();
            int height = d.getHeight();
            double weight = d.getWeight();
            int blooddonor = d.getBlooddonor();
            String bloodtype = d.getBloodtype();
      

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
                jc.updateDoctorAll(username, email, password, firstname, lastname, birthdate, gender, country, city, address, lat, lon, telephone, height, weight, blooddonor, bloodtype);
             

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
