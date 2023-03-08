/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.init.DB_Connection;
import database.tables.EditBloodTestTable;
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
import javax.servlet.http.HttpSession;
import mainClasses.BloodTest;
import mainClasses.SimpleUser;

/**
 *
 * @author USER
 */
@WebServlet(name = "Get_BloodTests", urlPatterns = {"/Get_BloodTests"})
public class Get_BloodTests extends HttpServlet {

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
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Get_BloodTests</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Get_BloodTests at " + request.getContextPath() + "</h1>");
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
        processRequest(request, response);
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
        
        response.setContentType("text/html;charset=UTF-8");

        String JSON = this.getJSONFromAjax(request.getReader());
        
        try{
            Connection con = DB_Connection.getConnection();
            Statement stmt_1 = con.createStatement();
            ResultSet rs_1;
        
            EditSimpleUserTable esu = new EditSimpleUserTable();
            
            SimpleUser su = esu.jsonToSimpleUser(JSON);
            int user_id =  su.getUser_id();
            System.out.println(user_id);
            
            String done = "done";
            
            rs_1 = stmt_1.executeQuery("SELECT * FROM randevouz WHERE user_id = '" + user_id+"' AND status = '"+done+"'");
            if(rs_1.next()){
            
            try(PrintWriter out = response.getWriter()) {
            
            try {
                
                Statement stmt = con.createStatement();
                ResultSet rs;
               
                EditBloodTestTable edt = new EditBloodTestTable();
                
                BloodTest bt = edt.jsonToBloodTest(JSON);
                String amka =  bt.getAmka();
                System.out.println(amka);
            
                rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE amka = '" + amka+"'");
            
                if(rs.next()){
                    ArrayList<String> bloodtestsList = edt.getBloodtests(amka);

                    if (bloodtestsList != null) {
                        out.println(bloodtestsList.toString());
                        response.setStatus(200);

                    } else {
                        response.setStatus(405);
                    }
                } 
                else{
                    response.setStatus(404);
                }
            }
            catch (Exception e) {
                response.setStatus(409);
                System.err.println("Got an exception! - GET Delete_User.java ");
                System.err.println(e.getMessage());
            }
            } 
            catch (Exception e) {
                response.setStatus(409);
                System.err.println("Got an exception! - GET Delete_User.java ");
                System.err.println(e.getMessage());
            } 
          }
            else{
                    response.setStatus(404);
                }
      }
       catch (Exception e) {
          response.setStatus(410);
          System.err.println("Got an exception! - GET Delete_User.java ");
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
