/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonObject;
import database.init.DB_Connection;
import database.tables.EditRandevouzTable;
import database.tables.EditSimpleUserTable;
import mainClasses.Randevouz;
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
import mainClasses.SimpleUser;
import static servlets.Register.filter;

/**
 *
 * @author USER
 */
@WebServlet(name = "Randevou", urlPatterns = {"/Randevou"})
public class Randevou extends HttpServlet {

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
            out.println("<title>Servlet Randevouz</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Randevouz at " + request.getContextPath() + "</h1>");
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
            
            EditRandevouzTable edt = new EditRandevouzTable();
          
             ArrayList<String> randevousList = edt.getRandevouz();

            if (randevousList != null) {
                
                out.println(randevousList.toString());
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
        
        EditRandevouzTable jc = new EditRandevouzTable();
        Randevouz p = jc.jsonToRandevouz(JSON);
        
        String date = p.getDate_time();
        
        int doctor_id = p.getDoctor_id();
        System.out.println(date);
        System.out.println(doctor_id);
        
        
        char modified_date[] = new char[date.length()];;
        
        for (int i=0; i<date.length(); i++){
            if(i == 10){
                modified_date[i] = ' ';
            }
            else{
                modified_date[i]= date.charAt(i);;
            }
        }
        
        String dt = String.valueOf(modified_date);
        
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();
            Statement stmt_2 = con.createStatement();
            ResultSet rs,rs_2;
            
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE doctor_id = '" + doctor_id +"'");
            
            if (rs.next()){
                rs_2 = stmt_2.executeQuery("SELECT * FROM randevouz WHERE date_time = '" + dt +"' AND doctor_id = '" + doctor_id +"'");
                
                System.out.println(modified_date);
                System.out.println(doctor_id);
                
                if(rs_2.next()){
                    response.setStatus(403);
                    JsonObject jo = new JsonObject();
                    jo.addProperty("error", "Randevou Already Taken!");
                    response.getWriter().write(jo.toString());
                }
                else if(!rs_2.next()){
                    jc.addRandevouzFromJSON(JSON);
                    response.setStatus(200);
                    JsonObject jo = new JsonObject();
                    jo.addProperty("Good", "Randevou added!");
                    response.getWriter().write(jo.toString());
                }
            }
            else{
                response.setStatus(405);
                JsonObject jo = new JsonObject();
                jo.addProperty("error", "Doctor not Exist!");
                response.getWriter().write(jo.toString());
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
