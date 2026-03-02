-- ============================================
-- CONSULTAS SQL PARA MEGASTORE
-- ============================================

-- 1. PROVEEDORES CON MÁS PRODUCTOS VENDIDOS Y VALOR DEL INVENTARIO
-- Muestra qué proveedores han vendido más items y el valor total del inventario por proveedor
SELECT 
    s.supplier_name AS Proveedor,
    COUNT(p.product_sku) AS Cantidad_Productos,
    SUM(p.unit_price * COALESCE(td.quantity, 0)) AS Valor_Total_Inventario
FROM supplier s
LEFT JOIN products p ON s.supplier_id = p.supplier_id
LEFT JOIN transaction_details td ON p.product_sku = td.product_sku
GROUP BY s.supplier_id, s.supplier_name
ORDER BY Cantidad_Productos DESC;

-- 2. HISTORIAL DE COMPRAS DE UN CLIENTE ESPECÍFICO
-- Reemplazar 'email@ejemplo.com' por el email del cliente que desea buscar
SELECT 
    c.customer_name AS Cliente,
    c.customer_email AS Email,
    t.date AS Fecha_Transaccion,
    p.product_name AS Producto,
    td.quantity AS Cantidad,
    td.unit_price AS Precio_Unitario,
    (td.quantity * td.unit_price) AS Total_Gastado
FROM clients c
LEFT JOIN transactions t ON c.customer_id = t.customer_id
LEFT JOIN transaction_details td ON t.transaction_id = td.transaction_id
LEFT JOIN products p ON td.product_sku = p.product_sku
WHERE c.customer_email = 'email@ejemplo.com'
ORDER BY t.date DESC;

-- 3. PRODUCTOS MÁS VENDIDOS POR CATEGORÍA (ordenados por ingresos)
-- Reemplazar 'Electronics' por la categoría que desea analizar
SELECT 
    p.product_category AS Categoria,
    p.product_name AS Producto,
    p.product_sku AS SKU,
    SUM(td.quantity) AS Cantidad_Vendida,
    SUM(td.quantity * td.unit_price) AS Ingresos_Totales
FROM products p
LEFT JOIN transaction_details td ON p.product_sku = td.product_sku
WHERE p.product_category = 'Electronics'
GROUP BY p.product_sku, p.product_name, p.product_category
ORDER BY Ingresos_Totales DESC;

-- ============================================
-- CONSULTAS ADICIONALES ÚTILES
-- ============================================

-- Ver todos los proveedores y sus productos
SELECT 
    s.supplier_name,
    p.product_name,
    p.product_sku,
    p.unit_price,
    p.product_category
FROM supplier s
JOIN products p ON s.supplier_id = p.supplier_id;

-- Ver transacciones con detalles completos
SELECT 
    t.transaction_id,
    t.date,
    c.customer_name,
    p.product_name,
    td.quantity,
    td.unit_price,
    (td.quantity * td.unit_price) AS total
FROM transactions t
JOIN clients t2 ON t.customer_id = t2.customer_id
JOIN transaction_details td ON t.transaction_id = td.transaction_id
JOIN products p ON td.product_sku = p.product_sku
JOIN clients c ON t.customer_id = c.customer_id;

