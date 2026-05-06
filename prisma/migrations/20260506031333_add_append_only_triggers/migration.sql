-- Triggers append-only para tablas de trazabilidad y auditoría.
-- Cualquier UPDATE o DELETE en estas tablas es rechazado por Postgres.
-- Las inserciones (INSERT) son permitidas sin restricción.
--
-- Tablas afectadas:
--   - audit_log                       (TRZ-C01)
--   - notification_log                (trazabilidad de envíos)
--   - offer_state_transitions         (TRZ-C02, HU-12)
--   - contact_message_notes           (RF-51)
--   - personal_data_authorizations    (Ley 1581)

-- Función genérica que rechaza la operación con un mensaje claro.
CREATE OR REPLACE FUNCTION reject_mutation_on_append_only()
RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'Operation % not allowed on append-only table %', TG_OP, TG_TABLE_NAME
    USING ERRCODE = '42501'; -- insufficient_privilege
END;
$$ LANGUAGE plpgsql;

-- audit_log
CREATE TRIGGER audit_log_no_update
  BEFORE UPDATE ON audit_log
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

CREATE TRIGGER audit_log_no_delete
  BEFORE DELETE ON audit_log
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

-- notification_log
CREATE TRIGGER notification_log_no_update
  BEFORE UPDATE ON notification_log
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

CREATE TRIGGER notification_log_no_delete
  BEFORE DELETE ON notification_log
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

-- offer_state_transitions
CREATE TRIGGER offer_state_transitions_no_update
  BEFORE UPDATE ON offer_state_transitions
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

CREATE TRIGGER offer_state_transitions_no_delete
  BEFORE DELETE ON offer_state_transitions
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

-- contact_message_notes
CREATE TRIGGER contact_message_notes_no_update
  BEFORE UPDATE ON contact_message_notes
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

CREATE TRIGGER contact_message_notes_no_delete
  BEFORE DELETE ON contact_message_notes
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

-- personal_data_authorizations
CREATE TRIGGER personal_data_authorizations_no_update
  BEFORE UPDATE ON personal_data_authorizations
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();

CREATE TRIGGER personal_data_authorizations_no_delete
  BEFORE DELETE ON personal_data_authorizations
  FOR EACH ROW EXECUTE FUNCTION reject_mutation_on_append_only();
