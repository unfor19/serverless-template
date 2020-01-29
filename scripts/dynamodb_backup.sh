#!/bin/bash
PYTHON_REF=$(source ./scripts/check_python.sh)
if [[ "$PYTHON_REF" == "NoPython" ]]; then
    echo "Python3.6+ is not installed."
    exit
fi

# Default values
region=
stage=
vault_profile=

usage(){
  cat << EOF
usage: bash ./scripts/dynamodb_backup -r eu-west-1 -t table_name
short    | full
-region  | --region
-t       | --table_name
-v       | --vault_profile
-h       | --help
EOF
}

while [ "$1" != "" ]; do
    case $1 in
        -region | --region )
            shift
            region=$1
        ;;
        -t | --table_name )
            shift
            table_name=$1
        ;;
        -v | --vault_profile )
            shift
            vault_profile=$1
        ;;                          
        -h | --help ) usage
            exit
        ;;
        * )          usage
            exit 1
    esac
    shift
done

[[ -z $region ]] && echo "Region is required"; usage; exit
[[ -z $stage ]] && echo "Stage is required"; usage; exit
[[ -z $table_name ]] && echo "Table name is required"; usage; exit

if [[ -z $vault_profile ]]; then
    $PYTHON_REF ./scripts/dynamodump.py -s ${table_name} -r $region -m backup
else
    aws-vault exec $vault_profile -- $PYTHON_REF ./scripts/dynamodump.py -s ${table_name} -r $region -m backup
fi
