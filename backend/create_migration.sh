#Ask for user input and run the migration command
echo "Enter the migration name"
read -r migration_name
echo "Running migration"
docker-compose exec backend alembic revision --autogenerate -m "$migration_name"