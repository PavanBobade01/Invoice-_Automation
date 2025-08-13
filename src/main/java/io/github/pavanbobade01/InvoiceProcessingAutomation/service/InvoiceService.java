package io.github.pavanbobade01.InvoiceProcessingAutomation.service;

import io.github.pavanbobade01.InvoiceProcessingAutomation.entity.Invoice;
import io.github.pavanbobade01.InvoiceProcessingAutomation.repository.InvoiceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
