/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.init.DB_Connection;
import database.tables.EditRandevouzTable;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Randevouz;
import static servlets.Register.filter;

/**
 *
 * @author USER
 */
public class Delete_Randevou extends HttpServlet {

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
            out.println("<title>Servlet Delete_Randevou</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Delete_Randevou at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
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
        
        EditRandevouzTable jc = new EditRandevouzTable();
        Randevouz d = jc.jsonToRandevouz(JSON);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs;

            int randevouz_id = d.getRandevouz_id();
            
            rs = stmt.executeQuery("SELECT * FROM randevouz WHERE randevouz_id = '" + randevouz_id+"'");
            
            if(rs.next()){
                String deleteQuery = "DELETE FROM randevouz WHERE randevouz_id = '" + randevouz_id+"'";
                stmt.executeUpdate(deleteQuery);
                stmt.close();
                con.close();
                response.setStatus(200);
            }
            else{
                response.setStatus(405);
            }
        } 
        catch (Exception e) {
            response.setStatus(409);
            System.err.println("Got an exception! POST - Delete_Randevou.java ");
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
