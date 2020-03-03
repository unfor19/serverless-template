#!/bin/bash
PYTHON_REF=$(source ./scripts/check_python.sh)
if [[ "$PYTHON_REF" == "NoPython" ]]; then
    echo "Python3.6+ is not installed."
    exit
fi

# Default values
region=
vault_profile=

usage(){
  cat << EOF
usage: bash ./scripts/dynamodb_backup -r eu-west-1 -st table_name
short    | full
-region  | --region
-st      | --src_table_name
-p       | --vault_profile
-h       | --help
EOF

exit
}

while [ "$1" != "" ]; do
    case $1 in
        -r | --region )
            shift
            region=$1
        ;;
        -st | --src_table_name )
            shift
            src_table_name=$1
        ;;
        -p | --vault_profile )
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

[[ -z ${region} ]] && echo "Region is required" && usage
[[ -z ${src_table_name} ]] && echo "Table name is required" && usage

if [[ -z $vault_profile ]]; then
    $PYTHON_REF ./scripts/dynamodump.py -s ${table_name} -r ${region} -m backup
else
    aws-vault exec $vault_profile -- $PYTHON_REF ./scripts/dynamodump.py -s ${src_table_name} -r ${region} -m backup
fi