/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;


import com.sun.javafx.font.FontFactory;
import database.init.DB_Connection;
import database.tables.EditDoctorTable;
import database.tables.EditRandevouzTable;
import database.tables.EditSimpleUserTable;
import java.awt.Font;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
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
import javax.swing.text.Document;
import mainClasses.Doctor;
import mainClasses.Randevouz;
import mainClasses.SimpleUser;
import static servlets.Register.filter;

/**
 *
 * @author USER
 */
@WebServlet(name = "Edit_Randevou", urlPatterns = {"/Edit_Randevou"})
public class Edit_Randevou extends HttpServlet {

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
            out.println("<title>Servlet Edit_Randevou</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Edit_Randevou at " + request.getContextPath() + "</h1>");
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
        
        String doctor_id = request.getParameter("doctor_id");
        String randevou_date_from = request.getParameter("date_time_from");
        String randevou_date_to = request.getParameter("date_time_to");

        
        
        char modified_date_from[] = new char[randevou_date_from.length()];;
        
            for (int i=0; i<randevou_date_from.length(); i++){
                if(i == 10){
                    modified_date_from[i] = ' ';
                }
                else{
                    modified_date_from[i]= randevou_date_from.charAt(i);;
                }
            }
            String dt_from = String.valueOf(modified_date_from);
      
        
         char modified_date_to[] = new char[randevou_date_to.length()];;
        
            for (int i=0; i<randevou_date_to.length(); i++){
                if(i == 10){
                    modified_date_to[i] = ' ';
                }
                else{
                    modified_date_to[i]= randevou_date_to.charAt(i);;
                }
            }
            String dt_to = String.valueOf(modified_date_to);    
            
            
        System.out.println("doctor_id : " + doctor_id);
        System.out.println("From : " + dt_from);
        System.out.println("To : " + dt_to);    
            
        
        
        try (PrintWriter out = response.getWriter()) {

            Connection con = DB_Connection.getConnection();

            Statement stmt_1 = con.createStatement();
            ResultSet rs;
            
            rs = stmt_1.executeQuery("SELECT * FROM doctors WHERE doctor_id = '" + doctor_id +"'");


            ArrayList<String> responseText = new ArrayList<String>();
            Statement stmt_id = con.createStatement();
            ResultSet rs_id;
                    
            if (rs.next()) {
                rs_id = stmt_id.executeQuery("SELECT * FROM randevouz WHERE doctor_id = '" + doctor_id + "' AND date_time >= '" + dt_from  + "' AND date_time <= '" + dt_to + "'");
                
                while(rs_id.next()) {
                    String bloodtest_json = DB_Connection.getResultsToJSON(rs_id);
                    responseText.add(bloodtest_json);
                }
                if (responseText != null){
                    
                   try{
                        FileOutputStream writeData = new FileOutputStream("C:/Users/USER/Desktop/Myfiles/CSD_FOLDERS/4_year/7o_Semester/HY359/webproject359/randevou.txt");
                        ObjectOutputStream writeStream = new ObjectOutputStream(writeData);
                            
                        writeStream.writeObject(responseText);
                        writeStream.flush();
                        writeStream.close();
                        System.out.println("success");

                    }catch (IOException e) {
                        e.printStackTrace();
                    }
                    
                    response.setStatus(200);
                    out.println(responseText.toString());
                }
                else{
                    response.setStatus(405);
                    out.println("No available randevouz for these dates!");
                }
            }else {
                    out.println("No available randevouz for these dates!");
                    response.setStatus(404);
            }

        } catch (Exception e) {
            response.setStatus(409);
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

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Connection con = DB_Connection.getConnection();

            int randevouz_id = p.getRandevouz_id();
            int doctor_id = p.getDoctor_id();
            int user_id = p.getUser_id();
            String date = p.getDate_time();
            int price = p.getPrice();
            String doctor_info = p.getDoctor_info();
            String user_info = p.getUser_info();
            String status = p.getStatus();
        
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
      
            Statement stmt = con.createStatement();
            Statement stmt_2 = con.createStatement();
            ResultSet rs_user,rs;
            
            rs = stmt_2.executeQuery("SELECT * FROM doctors WHERE doctor_id = '" + doctor_id +"'");
            
            if (rs.next()){
                rs_user = stmt.executeQuery("SELECT * FROM randevouz WHERE randevouz_id = '" + randevouz_id +"'");
                
                
                
                if (rs_user.next()) {
                    jc.updateRandevouzAll(randevouz_id, doctor_id, user_id, date, price, doctor_info, user_info, status);
                    response.setStatus(200); // update randevou successfully
                } else {
                    response.setStatus(405); // No randevou updated
                } 
            }
            else{
                 response.setStatus(404);
            }
        } catch (Exception e) {
            response.setStatus(409);
            System.err.println("Got an exception! - POST Edit_Randevou.java ");
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
