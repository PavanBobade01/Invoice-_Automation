package io.github.pavanbobade01.InvoiceProcessingAutomation.controller;

import io.github.pavanbobade01.InvoiceProcessingAutomation.dto.InvoiceDto;
import io.github.pavanbobade01.InvoiceProcessingAutomation.entity.Invoice;
import io.github.pavanbobade01.InvoiceProcessingAutomation.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/invoice")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // <-- This is the updated line
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    public ResponseEntity<?> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PostMapping
    public ResponseEntity<?> saveInvoice(@RequestBody InvoiceDto invoiceDto) {
        try {
            Invoice invoice = new Invoice();
            invoice.setVendorName(invoiceDto.getVendor());
            invoice.setProductName(invoiceDto.getProduct());
            invoice.setAmount(invoiceDto.getAmount());
            invoice.setInvoiceDate(invoiceDto.getDate() != null ? invoiceDto.getDate() : LocalDate.now());
            invoice.setAction("pending");

            Invoice saved = invoiceService.saveInvoice(invoice);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Long id) {
        try {
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete invoice: " + e.getMessage());
        }
    }
}