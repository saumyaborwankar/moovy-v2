"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageContent } from "../atoms/PageContent";
import { Client } from "@/lib/db/schema";
import { Button } from "antd";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSearch } from "@/app/redux/slice/searchSlice";
import { TAB_NAMES } from "../atoms/tabNames";
function findPerson(people: Client[], searchTerm: string) {
  return people.find((person) =>
    `${person.firstName} ${person.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
}

export default function PageSearch({ clientData }: { clientData: any }) {
  const search = useAppSelector((state) => state.search.search);
  const [foundClients, setFoundClients] = useState<Client[]>([]);
  const router = useRouter();
  useEffect(() => {
    // if (!search || search === "") {
    //   router.back();
    // }

    if (clientData) {
      const uniqueClientsSet = new Set<Client>();

      clientData.forEach((client: Client) => {
        const found = findPerson([client], search);
        if (found) {
          uniqueClientsSet.add(found);
        }
      });

      setFoundClients(Array.from(uniqueClientsSet));
    }
  }, [search, clientData]);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setSearch(""));
    router.back();
  };
  return (
    <div>
      <PageContent
        title="Search Results"
        extra={
          <Button
            type="link"
            icon={<IoMdClose style={{ fontSize: 20 }} />}
            onClick={handleClose}
          />
        }
      >
        {foundClients.map((client: Client) => {
          return (
            <Button
              type="link"
              key={client.id}
              onClick={() =>
                router.push(
                  `/${TAB_NAMES.dashboard}/${TAB_NAMES.clients}/${client.id}`
                )
              }
            >
              {client.firstName} {client.lastName}
            </Button>
          );
        })}
      </PageContent>
    </div>
  );
}
