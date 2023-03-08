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
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Doctor;
import mainClasses.SimpleUser;

/**
 *
 * @author USER
 */
public class Admin extends HttpServlet {

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
       
        response.setContentType("text/html;charset=UTF-8");

        try(PrintWriter out = response.getWriter()) {
            
            EditDoctorTable edt = new EditDoctorTable();
          
             ArrayList<String> doctorList = edt.getDoctors();

            if (doctorList != null) {
                
                out.println(doctorList.toString());
                response.setStatus(200);

            } else {
                response.setStatus(404);
            }
        } catch (Exception e) {
            System.err.println("Got an exception - doGet Certified Doctors! ");
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

            String amka = d.getAmka();
            int certified = d.getCertified();
            System.out.println(amka);
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE amka = '" + amka+"'");
            
            if(rs.next()){
                String update="UPDATE doctors SET certified='"+certified+"' WHERE amka = '" + amka+"'";
                stmt.executeUpdate(update);
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
