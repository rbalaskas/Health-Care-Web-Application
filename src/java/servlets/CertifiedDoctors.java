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
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
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
import java.sql.Connection;
import java.sql.Statement;

/**
 *
 * @author Kesenia
 */
@WebServlet(name = "CertifiedDoctors", urlPatterns = {"/CertifiedDoctors"})
public class CertifiedDoctors extends HttpServlet {

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
            out.println("<title>Servlet CertifiedDoctors</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet CertifiedDoctors at " + request.getContextPath() + "</h1>");
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
            EditDoctorTable edt = new EditDoctorTable();
            //Connection con = DB_Connection.getConnection();
            //Statement stmt_user_doctor = con.createStatement();
           // ResultSet rs_user_doctor;
           // rs_user_doctor = stmt_user_doctor.executeQuery("SELECT * FROM doctors WHERE certified = 1");
          
           ArrayList<String> doctorList = edt.databaseToCertifiedDoctors();

            if (doctorList != null) {
                
                System.out.println("Certified Doctors Exist!");
                
                out.println(doctorList.toString());

                response.setStatus(200);

            } else {
                response.setStatus(404);
            }
        } catch (Exception e) {
            System.err.println("Got an exception - doGet Certified Doctors! ");
            System.err.println(e.getMessage());
        }
    }

    
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
            Statement stmt = con.createStatement();
            ResultSet rs;

            int doctor_id = d.getDoctor_id();
            System.out.println("doctor_id =   " + doctor_id);
            
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE doctor_id = '" + doctor_id+"'");
            
            if(rs.next()){
                String deleteQuery = "DELETE FROM doctors WHERE doctor_id = '" + doctor_id+"'";
                stmt.executeUpdate(deleteQuery);
                stmt.close();
                con.close();
                response.setStatus(200);
                
            }
            else{
                response.setStatus(409);
            }
       
        } 
        catch (Exception e) {
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
