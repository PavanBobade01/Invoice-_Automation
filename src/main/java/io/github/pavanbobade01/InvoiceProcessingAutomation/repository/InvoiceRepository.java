package io.github.pavanbobade01.InvoiceProcessingAutomation.repository;

import io.github.pavanbobade01.InvoiceProcessingAutomation.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {}
