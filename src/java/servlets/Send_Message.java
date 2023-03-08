/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.init.DB_Connection;
import database.tables.EditMessageTable;
import database.tables.EditTreatmentTable;
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
import mainClasses.Message;
import mainClasses.Treatment;
import static servlets.Register.filter;

/**
 *
 * @author USER
 */
@WebServlet(name = "Send_Message", urlPatterns = {"/Send_Message"})
public class Send_Message extends HttpServlet {

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
            out.println("<title>Servlet Send_Message</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Send_Message at " + request.getContextPath() + "</h1>");
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
            line = filter(line);  // PUT THIS LINE IN COMMENTS IF YOU WANT NO INPUT FILTER
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
        
        try{
            
            EditMessageTable jc = new EditMessageTable();
            Message p = jc.jsonToMessage(JSON);
        
            Connection con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs;
            
            Statement stmt_1 = con.createStatement();
            ResultSet rs_1;
            
            int doctor_id = p.getDoctor_id();
            int user_id = p.getUser_id();
            
            System.out.println(doctor_id + "  " + user_id);
            
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE doctor_id = '" + doctor_id +"'");
            
            rs_1 = stmt_1.executeQuery("SELECT * FROM users WHERE user_id = '" + user_id +"'");
            
            if(rs.next() && rs_1.next()){
                jc.addMessageFromJSON(JSON);
                response.setStatus(200);
            }
            else{
                response.setStatus(405);
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Add_Treatment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(Add_Treatment.class.getName()).log(Level.SEVERE, null, ex);
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
